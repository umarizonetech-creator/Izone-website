import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Star,
  Users,
  Phone,
  MapPin,
  CalendarDays,
  FileText,
  Clock3,
  Clock,
  Check,
  ArrowRight,
  Eye,
  Pencil,
  Plus,
  X,
  Download,
  Trash2,
  Layers,
  Tag,
  List,
  UserCircle,
  Link as LinkIcon,
  BookOpen,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  Flame,
  Save,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  AdminLayout,
  DataTable,
  DetailRow,
  FormModal,
  SelectField,
  TextField,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { getCourseUrl } from "@/utils/courseSlug";
import { AVAILABLE_COURSE_ICONS } from "@/utils/courseIcons";
import CourseOfferPriceDisplay, { isOfferValid, getOfferDeadlineLabel, formatRupees, parseNumericPrice } from "@/components/CourseOfferPriceDisplay";

function SectionHeader({ title, description, action }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {action}
    </div>
  );
}

function SidePanel({ title, description, children, className = "", panelRef }) {
  return (
    <div ref={panelRef} className={`glass-card rounded-2xl p-5 ${className}`}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>}
      {children}
    </div>
  );
}

function getRatingValue(value) {
  const rating = Number(value);
  if (!Number.isFinite(rating)) return 5;
  return Math.min(5, Math.max(1, Math.round(rating)));
}

function RatingStars({ value, compact = false }) {
  const rating = getRatingValue(value);

  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} star rating`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${compact ? "h-3.5 w-3.5" : "h-4 w-4"} ${
            star <= rating ? "fill-primary text-primary" : "text-muted-foreground/35"
          }`}
        />
      ))}
    </span>
  );
}

function StarRatingField({ label, value, onChange, required }) {
  const rating = getRatingValue(value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            onClick={() => onChange(String(star))}
            className="rounded-md p-1 text-muted-foreground transition hover:scale-110 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Star
              className={`h-7 w-7 ${
                star <= rating ? "fill-primary text-primary" : "text-muted-foreground/35"
              }`}
            />
          </button>
        ))}
        <span className="ml-1 text-sm text-muted-foreground">
          {rating} {rating === 1 ? "star" : "stars"}
        </span>
      </div>
      {required && <input className="sr-only" tabIndex={-1} value={rating} required readOnly />}
    </div>
  );
}

function CrudPage({
  title,
  description,
  data,
  operations,
  emptyItem,
  columns,
  fields,
  detailRows,
  addLabel = "Add New",
  detailPanelClassName = "",
  scrollDetailsOnSelect = false,
}) {
  const [selected, setSelected] = useState(data[0] ?? null);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyItem);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const detailPanelRef = useRef(null);
  const { toast } = useToast();

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const normalized = fields.reduce((next, field) => {
      const value = item[field.key];
      return {
        ...next,
        [field.key]: Array.isArray(value) ? value.join(", ") : value,
      };
    }, {});
    setFormData({ ...emptyItem, ...item, ...normalized });
    setIsModalOpen(true);
  };

  const closeModal = (force = false) => {
    if (isSubmitting && !force) return;
    setIsModalOpen(false);
    setEditing(null);
    setFormData(emptyItem);
  };

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleValueChange = (key) => (value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (key) => (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, [key]: reader.result?.toString() || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (editing) {
        const saved = await operations.update(editing.id, formData);
        setSelected(saved ?? { ...editing, ...formData });
      } else {
        const saved = await operations.add(formData);
        setSelected(saved ?? { ...formData, id: Date.now().toString() });
      }

      closeModal(true);
    } catch (error) {
      console.error(`Failed to save ${title}`, error);
      toast({
        title: "Save failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    operations.remove(id);
    if (selected?.id === id) {
      const nextItem = data.find((item) => item.id !== id) ?? null;
      setSelected(nextItem);
    }
  };

  const handleSelect = (item) => {
    setSelected(item);
    window.requestAnimationFrame(() => {
      detailPanelRef.current?.scrollTo({ top: 0 });
      if (scrollDetailsOnSelect) {
        detailPanelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    });
  };

  return (
    <AdminLayout>
      <SectionHeader
        title={title}
        description={description}
        action={<Button onClick={openCreate}>{addLabel}</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={columns}
            data={data}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRowClick={handleSelect}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Details" : "No Selection"}
          description={
            selected
              ? "Select any row to review the full record."
              : "Create a record or pick one from the table."
          }
          className={detailPanelClassName}
          panelRef={detailPanelRef}
        >
          {selected ? (
            <div>
              {detailRows(selected).map((row) => (
                <DetailRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>

      {isModalOpen && (
        <FormModal
          title={editing ? `Edit ${title}` : `Create ${title}`}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        >
          {fields.map((field) =>
            field.type === "select" ? (
              <SelectField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                options={field.options}
                required={field.required}
              />
            ) : field.type === "rating" ? (
              <StarRatingField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? "5"}
                onChange={handleValueChange(field.key)}
                required={field.required}
              />
            ) : field.type === "image" ? (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-medium">{field.label}</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange(field.key)}
                  required={field.required && !formData[field.key]}
                />
              </div>
            ) : field.type === "imageDropzone" ? (
              <div key={field.key} className="space-y-3">
                <label className="text-sm font-medium">{field.label}</label>
                <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-background px-4 text-center transition-colors hover:bg-primary/5">
                  <ImageIcon className="mb-3 h-7 w-7 text-foreground" />
                  <span className="text-sm font-medium text-foreground">Click to upload image</span>
                  <span className="mt-2 text-xs text-muted-foreground">JPG, PNG, GIF, WebP, SVG...</span>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange(field.key)}
                    required={field.required && !formData[field.key]}
                    className="sr-only"
                  />
                </label>
              </div>
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                placeholder={field.placeholder}
                required={field.required}
                textarea={field.type === "textarea"}
              />
            )
          )}
        </FormModal>
      )}
    </AdminLayout>
  );
}

function InboxPage({
  title,
  description,
  data,
  columns,
  detailRows,
  onDelete,
  statusKey,
  statusOptions,
  onStatusChange,
}) {
  const [selected, setSelected] = useState(data[0] ?? null);

  return (
    <AdminLayout>
      <SectionHeader title={title} description={description} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={columns}
            data={data}
            onDelete={onDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Record Details" : "No Selection"}
          description={
            selected ? "Use the details panel to review the full submission." : "Select a row to review it here."
          }
        >
          {selected ? (
            <div>
              {statusKey && (
                <div className="mb-4">
                  <SelectField
                    label="Status"
                    value={selected[statusKey] ?? ""}
                    onChange={(event) => {
                      onStatusChange(selected.id, event.target.value);
                      setSelected((prev) => ({ ...prev, [statusKey]: event.target.value }));
                    }}
                    options={statusOptions}
                  />
                </div>
              )}
              {detailRows(selected).map((row) => (
                <DetailRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>
    </AdminLayout>
  );
}

export function PopupManagement() {
  const { popups, popupOps } = useAdmin();
  const { toast } = useToast();
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", message: "", image: "", status: "Active" });

  const openCreate = () => {
    setEditing(null);
    setFormData({ title: "", message: "", image: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormData({
      title: item.title || "",
      message: item.message || "",
      image: item.image || "",
      status: item.status || "Active",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditing(null);
    setFormData({ title: "", message: "", image: "", status: "Active" });
  };

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result?.toString() || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      if (editing) {
        await popupOps.update(editing.id, formData);
      } else {
        await popupOps.add(formData);
      }
      setIsModalOpen(false);
      setEditing(null);
      setFormData({ title: "", message: "", image: "", status: "Active" });
    } catch (error) {
      console.error("Failed to save popup", error);
      toast({
        title: "Save failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await popupOps.remove(id);
    } catch (error) {
      console.error("Failed to delete popup", error);
      toast({
        title: "Delete failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    }
  };

  const handleSetStatus = async (popup, status) => {
    if (popup.status === status || statusUpdatingId === popup.id) return;
    setStatusUpdatingId(popup.id);

    try {
      await popupOps.update(popup.id, { ...popup, status });
    } catch (error) {
      console.error("Failed to update popup status", error);
      toast({
        title: "Status update failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    } finally {
      setStatusUpdatingId(null);
    }
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="Popup Management"
        description="Popups display in the Hero section of the homepage."
        action={
          <Button onClick={openCreate} className="gap-2 rounded-xl px-6">
            <Plus size={18} />
            Add Popup
          </Button>
        }
      />

      {/* Desktop table (md+) */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-primary bg-card/70 shadow-[0_28px_80px_rgba(22,101,52,0.10)]">
        <div className="grid grid-cols-[1.1fr_1.7fr_1.1fr_1.2fr_1.4fr] gap-6 px-6 py-5 text-sm font-semibold text-foreground">
          <div>Title</div>
          <div>Description</div>
          <div>Image</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {popups.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-muted-foreground">
            No records found.
          </div>
        ) : (
          <div className="divide-y divide-primary/10">
            {popups.map((popup) => {
              const isActive = popup.status === "Active";
              return (
                <div
                  key={popup.id}
                  className="grid grid-cols-[1.1fr_1.7fr_1.1fr_1.2fr_1.4fr] items-center gap-6 px-6 py-5 text-sm"
                >
                  <div className="min-w-0 truncate font-medium">{popup.title || "—"}</div>
                  <div className="min-w-0 truncate text-muted-foreground">{popup.message || "—"}</div>
                  <div>
                    {popup.image ? (
                      <img
                        src={popup.image}
                        alt={popup.title || "Popup image"}
                        className="h-14 w-14 rounded-md border border-primary object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-md border border-primary/40 bg-background text-primary">
                        <ImageIcon size={18} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="inline-flex overflow-hidden rounded-full border border-primary bg-background text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => handleSetStatus(popup, "Active")}
                        disabled={statusUpdatingId === popup.id}
                        className={`min-w-20 px-4 py-2 transition ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/10"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                        aria-label="Make popup active"
                      >
                        {statusUpdatingId === popup.id && !isActive ? "Saving..." : "Active"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetStatus(popup, "Inactive")}
                        disabled={statusUpdatingId === popup.id}
                        className={`min-w-20 border-l border-primary px-4 py-2 transition ${
                          !isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-primary/10"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                        aria-label="Make popup inactive"
                      >
                        {statusUpdatingId === popup.id && isActive ? "Saving..." : "Inactive"}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => openEdit(popup)}
                      aria-label="Edit popup"
                    >
                      <Pencil size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(popup.id)}
                      aria-label="Delete popup"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile cards (<md) */}
      <div className="md:hidden space-y-3">
        {popups.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">No records found.</div>
        ) : (
          popups.map((popup) => {
            const isActive = popup.status === "Active";
            return (
              <div key={popup.id} className="rounded-2xl border border-primary bg-card/70 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  {popup.image ? (
                    <img src={popup.image} alt={popup.title || "Popup image"} className="h-14 w-14 shrink-0 rounded-md border border-primary object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-background text-primary">
                      <ImageIcon size={18} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate">{popup.title || "-"}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{popup.message || "-"}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(popup)} aria-label="Edit popup"><Pencil size={15} /></Button>
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(popup.id)} aria-label="Delete popup"><Trash2 size={15} /></Button>
                  </div>
                </div>
                <div className="inline-flex overflow-hidden rounded-full border border-primary bg-background text-xs font-semibold">
                  <button type="button" onClick={() => handleSetStatus(popup, "Active")} disabled={statusUpdatingId === popup.id} className={`px-4 py-1.5 transition ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"} disabled:cursor-not-allowed disabled:opacity-60`} aria-label="Make popup active">
                    {statusUpdatingId === popup.id && !isActive ? "Saving..." : "Active"}
                  </button>
                  <button type="button" onClick={() => handleSetStatus(popup, "Inactive")} disabled={statusUpdatingId === popup.id} className={`border-l border-primary px-4 py-1.5 transition ${!isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-primary/10"} disabled:cursor-not-allowed disabled:opacity-60`} aria-label="Make popup inactive">
                    {statusUpdatingId === popup.id && isActive ? "Saving..." : "Inactive"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <FormModal
          title={editing ? "Edit Popup" : "Create Popup"}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        >
          <TextField
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Popup title"
            required
          />
          <TextField
            label="Description"
            value={formData.message}
            onChange={handleChange("message")}
            placeholder="Popup description"
            required
            textarea
          />
          <div className="space-y-3">
            <label className="text-sm font-medium">Image (optional)</label>
            {formData.image && (
              <img
                src={formData.image}
                alt="Popup preview"
                className="h-36 w-full rounded-xl border border-border object-cover"
              />
            )}
            <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary bg-background px-4 text-center transition-colors hover:bg-primary/5">
              <ImageIcon className="mb-3 h-7 w-7 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                {formData.image ? "Click to replace image" : "Click to upload image"}
              </span>
              <span className="mt-2 text-xs text-muted-foreground">JPG, PNG, GIF, WebP, SVG...</span>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>
          <SelectField
            label="Status"
            value={formData.status}
            onChange={handleChange("status")}
            options={["Active", "Inactive"]}
          />
        </FormModal>
      )}
    </AdminLayout>
  );
}

export function ClientManagement() {
  const { clients, clientOps } = useAdmin();
  const { toast } = useToast();
  const empty = { name: "", logo: "", industry: "", description: "" };
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);

  const openCreate = () => { setEditing(null); setFormData(empty); setIsModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setFormData({ ...empty, ...item }); setIsModalOpen(true); };
  const closeModal = () => { if (isSubmitting) return; setIsModalOpen(false); setEditing(null); setFormData(empty); };

  const handleChange = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData((p) => ({ ...p, logo: reader.result?.toString() || "" }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editing) {
        const saved = await clientOps.update(editing.id, formData);
        setSelected((p) => p?.id === editing.id ? { ...p, ...(saved || formData) } : p);
      } else {
        await clientOps.add(formData);
      }
      setIsSubmitting(false);
      closeModal();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    clientOps.remove(id);
    if (selected?.id === id) setSelected(null);
  };

  const isImage = (val) => val && (val.startsWith("data:") || val.startsWith("http") || val.startsWith("/") || val.startsWith("blob:"));

  return (
    <AdminLayout>
      <SectionHeader
        title="Client Management"
        description="Manage client logos, names, and company descriptions."
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus size={16} /> Add Client
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={[
              {
                key: "name",
                label: "Client",
                render: (_, row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0 p-0.5">
                      {isImage(row.logo) ? (
                        <img src={row.logo} alt={row.name} className="w-full h-full object-contain" />
                      ) : (
                        <span>{row.logo || row.name?.slice(0, 2)?.toUpperCase() || "CL"}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.industry || "Unspecified"}</p>
                    </div>
                  </div>
                ),
              },
              { key: "industry", label: "Industry" },
            ]}
            data={clients}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Details" : "No Selection"}
          description={selected ? "Full client details." : "Select a client to view details."}
          className="xl:sticky xl:top-6 xl:self-start xl:max-h-[80vh] xl:overflow-y-auto"
        >
          {selected ? (
            <div className="space-y-1">
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-border">
                <div className="w-14 h-14 rounded-xl bg-white border border-primary/20 flex items-center justify-center text-primary font-bold text-lg overflow-hidden shrink-0 p-1">
                  {isImage(selected.logo) ? (
                    <img src={selected.logo} alt={selected.name} className="w-full h-full object-contain" />
                  ) : (
                    <span>{selected.logo || selected.name?.slice(0, 2)?.toUpperCase() || "CL"}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">{selected.name}</p>
                  <p className="text-sm text-primary">{selected.industry}</p>
                </div>
              </div>
              <DetailRow icon={Building2} label="Client Name" value={selected.name} />
              <DetailRow icon={Briefcase} label="Industry" value={selected.industry || "Not set"} />
              <DetailRow icon={FileText} label="Description" value={selected.description || "Not set"} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>

      {isModalOpen && (
        <FormModal
          title={editing ? "Edit Client" : "Add Client"}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        >
          <TextField label="Client Name" value={formData.name} onChange={handleChange("name")} placeholder="Client company name" required />
          <TextField label="Industry" value={formData.industry} onChange={handleChange("industry")} placeholder="Technology" />
          <TextField label="Description" value={formData.description} onChange={handleChange("description")} placeholder="What this client does" textarea />
          <div className="space-y-2">
            <label className="text-sm font-medium">Logo Image</label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white border border-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0 p-1">
                {isImage(formData.logo) ? (
                  <img src={formData.logo} alt="logo" className="w-full h-full object-contain" />
                ) : (
                  <span>{formData.logo || formData.name?.slice(0, 2)?.toUpperCase() || "CL"}</span>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-primary hover:underline">
                <ImageIcon size={13} /> Upload logo image
                <input type="file" accept="image/*" className="sr-only" onChange={handleLogoChange} />
              </label>
            </div>
          </div>
        </FormModal>
      )}
    </AdminLayout>
  );
}

const emptyPortfolio = {
  title: "",
  category: "",
  description: "",
  image: "",
  tags: ["", "", "", ""],
  client: "",
  link: "",
};

const normalizePortfolioForm = (item = {}) => ({
  ...emptyPortfolio,
  ...item,
  client: item.client || item.clientName || "",
  tags: [...(Array.isArray(item.tags) ? item.tags : []), "", "", "", ""].slice(0, 4),
});

export function PortfolioManagement() {
  const { portfolios, portfolioOps } = useAdmin();
  const { toast } = useToast();
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyPortfolio);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyPortfolio);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormData(normalizePortfolioForm(item));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setEditing(null);
    setFormData(emptyPortfolio);
  };

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleTagChange = (index) => (event) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, tagIndex) => (tagIndex === index ? event.target.value : tag)),
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result?.toString() || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags.map((tag) => tag.trim()).filter(Boolean).slice(0, 4),
    };

    try {
      if (editing) {
        const saved = await portfolioOps.update(editing.id, payload);
        setSelected(saved ?? { ...editing, ...payload });
      } else {
        const saved = await portfolioOps.add(payload);
        setSelected(saved ?? payload);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save portfolio", error);
      toast({
        title: "Save failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await portfolioOps.remove(id);
      if (selected?.id === id) setSelected(null);
    } catch (error) {
      console.error("Failed to delete portfolio", error);
      toast({
        title: "Delete failed",
        description: "Please login again and check that the backend is running.",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="Portfolio Management"
        description="Manage projects shown on the public portfolio page."
        action={
          <Button onClick={openCreate} className="gap-2">
            <Plus size={16} />
            Add Portfolio
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={[
              {
                key: "title",
                label: "Project",
                render: (_, row) => (
                  <div className="flex items-center gap-3">
                    {row.image ? (
                      <img src={row.image} alt={row.title} className="h-11 w-14 rounded-md border border-border object-cover" />
                    ) : (
                      <div className="flex h-11 w-14 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <ImageIcon size={16} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium">{row.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{row.client || row.clientName || "No client"}</p>
                    </div>
                  </div>
                ),
              },
              { key: "category", label: "Category" },
              {
                key: "tags",
                label: "Tech Stack",
                render: (value) => (
                  <div className="flex max-w-64 flex-wrap gap-1">
                    {(value || []).slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                ),
              },
            ]}
            data={portfolios}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Details" : "No Selection"}
          description={selected ? "Full project details." : "Select a portfolio item to view details."}
          className="xl:sticky xl:top-6 xl:self-start xl:max-h-[80vh] xl:overflow-y-auto"
        >
          {selected ? (
            <div>
              {selected.image && (
                <img src={selected.image} alt={selected.title} className="mb-4 aspect-video w-full rounded-xl border border-border object-cover" />
              )}
              <DetailRow icon={Briefcase} label="Title" value={selected.title} />
              <DetailRow icon={Tag} label="Category" value={selected.category} />
              <DetailRow icon={FileText} label="Description" value={selected.description} />
              <DetailRow icon={List} label="Tech Stack" value={(selected.tags || []).slice(0, 4).join(", ")} />
              <DetailRow icon={Building2} label="Client" value={selected.client || selected.clientName} />
              <DetailRow icon={LinkIcon} label="Link" value={selected.link} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>

      {isModalOpen && (
        <FormModal
          title={editing ? "Edit Portfolio" : "Add Portfolio"}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        >
          <TextField label="Title" value={formData.title} onChange={handleChange("title")} placeholder="Project title" required />
          <TextField label="Category" value={formData.category} onChange={handleChange("category")} placeholder="Web Development" required />
          <TextField label="Description" value={formData.description} onChange={handleChange("description")} placeholder="Short project description" textarea required />

          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            {formData.image && (
              <img src={formData.image} alt="Portfolio preview" className="aspect-video w-full rounded-xl border border-border object-cover" />
            )}
            <Input
              value={formData.image?.startsWith("data:") ? "" : formData.image}
              onChange={handleChange("image")}
              placeholder="Image URL"
              className="bg-background border-border text-sm"
            />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tech Stack (4 only)</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {formData.tags.map((tag, index) => (
                <Input
                  key={index}
                  value={tag}
                  onChange={handleTagChange(index)}
                  placeholder={`Tech ${index + 1}`}
                  className="bg-background border-border text-sm"
                />
              ))}
            </div>
          </div>

          <TextField label="Client" value={formData.client} onChange={handleChange("client")} placeholder="Client name" required />
          <TextField label="Link" value={formData.link} onChange={handleChange("link")} placeholder="https://example.com" />
        </FormModal>
      )}
    </AdminLayout>
  );
}

export function TestimonialManagement() {
  const { testimonials, testimonialOps } = useAdmin();

  return (
    <CrudPage
      title="Testimonial Management"
      description="Manage quotes, author details, ratings, and avatar images."
      data={testimonials}
      operations={testimonialOps}
      emptyItem={{ quote: "", author: "", position: "", rating: "5", avatar: "" }}
      columns={[
        {
          key: "author",
          label: "Author",
          render: (_, row) => (
            <div className="flex items-center gap-3">
              {row.avatar ? (
                <img src={row.avatar} alt={row.author} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {row.author?.slice(0, 1) || "A"}
                </div>
              )}
              <div>
                <p className="font-medium">{row.author}</p>
                <p className="text-xs text-muted-foreground">{row.position}</p>
              </div>
            </div>
          ),
        },
        { key: "rating", label: "Rating", render: (value) => <RatingStars value={value} compact /> },
      ]}
      fields={[
        { key: "author", label: "Author Name", placeholder: "Client name", required: true },
        { key: "position", label: "Position", placeholder: "Designation, Company", required: true },
        { key: "rating", label: "Rating", type: "rating", required: true },
        { key: "avatar", label: "Avatar", type: "image" },
        { key: "quote", label: "Quote", placeholder: "Client feedback", required: true, type: "textarea" },
      ]}
      detailRows={(item) => [
        { icon: Users, label: "Author", value: item.author },
        { icon: Briefcase, label: "Position", value: item.position },
        { icon: Star, label: "Rating", value: <RatingStars value={item.rating} /> },
        { icon: ImageIcon, label: "Avatar", value: item.avatar ? "Image added" : "Not set" },
        { icon: MessageSquare, label: "Quote", value: item.quote },
      ]}
      detailPanelClassName="xl:sticky xl:top-6 xl:self-start xl:h-[500px] xl:overflow-y-auto"
      scrollDetailsOnSelect
      addLabel="Add Testimonial"
    />
  );
}

export function JobRoleManagement() {
  const { jobRoles, jobRoleOps, jobApplications, jobAppOps } = useAdmin();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Job Role Management
        </h1>
        {activeTab === "roles" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={() => document.getElementById("job-role-create")?.click()}
          >
            <Plus className="h-5 w-5" />
            Add Job Role
          </Button>
        ) : (
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
            {jobApplications.length} Applications
          </span>
        )}
      </div>

      <div className="space-y-10">
        <div className="flex w-fit items-center rounded-2xl bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "roles"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Job Roles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "applications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
            <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              {jobApplications.length}
            </span>
          </button>
        </div>

        {activeTab === "roles" ? (
          <CrudPageInner
            title=""
            framed={false}
            addLabel="Add Job Role"
            createButtonId="job-role-create"
            hideCreateButton
            data={jobRoles}
            operations={jobRoleOps}
            emptyItem={{ roleName: "", qualification: "", location: "", workCulture: "", workTiming: "" }}
            columns={[
              { key: "roleName", label: "Role Name" },
              { key: "qualification", label: "Qualification" },
              {
                key: "workTiming",
                label: "Work Timing",
                render: (value) => (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-500">
                    {value || "Full Time"}
                  </span>
                ),
              },
              { key: "location", label: "Location" },
              {
                key: "workCulture",
                label: "Work Culture",
                render: (value) => (
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-500">
                    {value || "Remote"}
                  </span>
                ),
              },
            ]}
            fields={[
              { key: "roleName", label: "Role Name", placeholder: "Frontend Developer", required: true },
              { key: "qualification", label: "Qualification", placeholder: "B.Tech / BCA / Relevant Experience", required: true },
              { key: "location", label: "Location", placeholder: "Tiruchirappalli", required: true },
              {
                key: "workCulture",
                label: "Work Culture",
                type: "select",
                required: true,
                options: [
                  { value: "Hybrid", label: "Hybrid" },
                  { value: "Onsite", label: "Onsite" },
                  { value: "Remote", label: "Remote" },
                ],
              },
              {
                key: "workTiming",
                label: "Work Timing",
                type: "select",
                required: true,
                options: [
                  { value: "Full Time", label: "Full Time" },
                  { value: "Part Time", label: "Part Time" },
                ],
              },
            ]}
          />
        ) : (
          <DataTable
            columns={[
              {
                key: "name",
                label: "Applicant",
                render: (value) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {value?.slice(0, 1)?.toUpperCase() || "A"}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ),
              },
              {
                key: "email",
                label: "Email",
                render: (value) =>
                  value ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No email"
                  ),
              },
              {
                key: "phone",
                label: "Phone",
                render: (value) =>
                  value ? (
                    <a
                      href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No phone"
                  ),
              },
              { key: "jobRole", label: "Applied For" },
              { key: "date", label: "Applied On" },
              {
                key: "resume",
                label: "Document",
                render: (value, row) =>
                  value ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedApplication(row);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  ) : (
                    row.resumeName || "No file"
                  ),
              },
            ]}
            data={jobApplications}
            onDelete={jobAppOps.remove}
          />
        )}
      </div>

      {selectedApplication && (
        <JobApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onDelete={() => {
            jobAppOps.remove(selectedApplication.id);
            setSelectedApplication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

function JobApplicationDetailModal({ application, onClose, onDelete }) {
  const resumePreviewSrc = application.resume
    ? `${application.resume}${application.resume.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=1`
    : "";
  const details = [
    { icon: Users, label: "Full Name", value: application.name },
    { icon: Phone, label: "Phone", value: application.phone },
    { icon: Mail, label: "Email", value: application.email },
    { icon: Briefcase, label: "Applied For", value: application.jobRole },
    { icon: FileText, label: "Qualification", value: application.qualification },
    { icon: Clock3, label: "Experience", value: application.experience },
    { icon: MapPin, label: "Location", value: application.location || application.address },
    { icon: CalendarDays, label: "Applied On", value: application.date },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex max-h-[84vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-9">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
                {application.name?.slice(0, 1)?.toUpperCase() || "A"}
              </span>
              <div>
                <h2 className="text-xl font-bold leading-tight text-foreground">{application.name}</h2>
                <p className="text-sm text-muted-foreground sm:text-base">{application.jobRole}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close application details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-9">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Applicant Details
            </h3>
            <div className="grid gap-x-9 gap-y-3 md:grid-cols-2">
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-4 border-b border-border pb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="truncate text-base font-semibold text-foreground">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Document</h3>
                {application.resume && (
                  <a
                    href={application.resume}
                    download={application.resumeName || "resume"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}
              </div>
              {application.resume ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <iframe
                    title={`${application.name || "Applicant"} resume`}
                    src={resumePreviewSrc}
                    className="h-[350px] w-full"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                  No document uploaded.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-9">
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CrudPageInner({
  title,
  data,
  operations,
  emptyItem,
  columns,
  fields,
  addLabel = "Add",
  framed = true,
  createButtonId,
  hideCreateButton = false,
}) {
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyItem);

  const handleChange = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const closeModal = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(false);
  };

  const openCreate = () => {
    setEditing(null);
    setFormData(emptyItem);
    setIsModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setFormData({ ...emptyItem, ...item });
    setIsModalOpen(true);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (editing) {
        await operations.update(editing.id, formData);
      } else {
        await operations.add(formData);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save", error);
      toast({
        title: "Save failed",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={framed ? "glass-card rounded-2xl p-4 md:p-5" : "space-y-6"}>
      <button id={createButtonId} type="button" className="hidden" onClick={openCreate} />
      {!hideCreateButton && (
        <div className={framed ? "mb-4 flex items-center justify-between" : "flex justify-end"}>
          {framed && <h2 className="font-display text-lg font-semibold">{title}</h2>}
        <Button
          size={framed ? "sm" : undefined}
          className={framed ? undefined : "rounded-2xl px-6 py-6 text-base font-semibold"}
          onClick={openCreate}
        >
          {!framed && <Plus className="h-5 w-5" />}
          {addLabel}
        </Button>
        </div>
      )}

      <DataTable columns={columns} data={data} onEdit={openEdit} onDelete={operations.remove} />

      {isModalOpen && (
        <FormModal title={editing ? `Edit ${title}` : `Add ${title}`} onClose={closeModal} onSubmit={handleSubmit} submitting={isSubmitting}>
          {fields.map((field) =>
            field.type === "select" ? (
              <SelectField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                options={field.options}
                required={field.required}
              />
            ) : (
              <TextField
                key={field.key}
                label={field.label}
                value={formData[field.key] ?? ""}
                onChange={handleChange(field.key)}
                placeholder={field.placeholder}
                required={field.required}
                textarea={field.type === "textarea"}
              />
            )
          )}
        </FormModal>
      )}
    </div>
  );
}

export function ContactManagement() {
  const { contacts, contactOps } = useAdmin();
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Contact Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Submissions from the website contact form.
          </p>
        </div>
        <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
          {contacts.length} total
        </span>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          {
            key: "email",
            label: "Email",
            render: (value) =>
              value ? (
                <a
                  href={`mailto:${value}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No email"
              ),
          },
          {
            key: "phone",
            label: "Phone",
            render: (value) =>
              value ? (
                <a
                  href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No phone"
              ),
          },
          { key: "subject", label: "Subject" },
          { key: "date", label: "Date" },
          {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedContact(row);
                  }}
                  aria-label="View contact details"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    contactOps.remove(row.id);
                  }}
                  aria-label="Delete contact"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ),
          },
        ]}
        data={contacts}
      />

      {selectedContact && (
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </AdminLayout>
  );
}

function ContactDetailModal({ contact, onClose }) {
  const details = [
    { label: "Name", value: contact.name },
    { label: "Email", value: contact.email },
    { label: "Phone", value: contact.phone },
    { label: "Subject", value: contact.subject },
    { label: "Date", value: contact.date },
    { label: "Message", value: contact.message },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 className="text-xl font-bold text-foreground">Contact Details</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close contact details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-5 px-6 py-6">
            {details.map((item) => (
              <div key={item.label} className="grid grid-cols-[110px_minmax(0,1fr)] gap-5">
                <p className="font-semibold text-muted-foreground">{item.label}</p>
                <p className="min-w-0 break-words font-medium text-foreground">
                  {item.value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-border bg-background px-6 py-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InternManagement() {
  const { internRoles, internRoleOps, internApplications, internAppOps } = useAdmin();
  const [activeTab, setActiveTab] = useState("roles");
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Intern Management
          </h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-base">
            Manage intern roles and applications.
          </p>
        </div>
        {activeTab === "roles" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={() => document.getElementById("intern-role-create")?.click()}
          >
            <Plus className="h-5 w-5" />
            Add Role
          </Button>
        ) : (
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
            {internApplications.length} Applications
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex w-fit items-center rounded-2xl bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "roles"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Intern Roles
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "applications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
            <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              {internApplications.length}
            </span>
          </button>
        </div>

        {activeTab === "roles" ? (
          <CrudPageInner
            title=""
            framed={false}
            addLabel="Add Role"
            createButtonId="intern-role-create"
            hideCreateButton
            data={internRoles}
            operations={internRoleOps}
            emptyItem={{ roleName: "", description: "", duration: "3 Months" }}
            columns={[
              { key: "roleName", label: "Role Name" },
              { key: "description", label: "Description" },
              { key: "duration", label: "Duration" },
            ]}
            fields={[
              { key: "roleName", label: "Role Name", placeholder: "UI/UX Intern", required: true },
              { key: "description", label: "Description", placeholder: "Describe the role", type: "textarea" },
              { key: "duration", label: "Duration", placeholder: "3 Months", required: true },
            ]}
          />
        ) : (
          <DataTable
            columns={[
              {
                key: "name",
                label: "Applicant",
                render: (value) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {value?.slice(0, 1)?.toUpperCase() || "A"}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ),
              },
              {
                key: "email",
                label: "Email",
                render: (value) =>
                  value ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No email"
                  ),
              },
              {
                key: "phone",
                label: "Phone",
                render: (value) =>
                  value ? (
                    <a
                      href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No phone"
                  ),
              },
              { key: "role", label: "Applied Role" },
              { key: "qualification", label: "Qualification" },
              { key: "date", label: "Applied On" },
              {
                key: "actions",
                label: "Actions",
                render: (_, row) => (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedApplication(row);
                      }}
                      aria-label="View intern application"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        internAppOps.remove(row.id);
                      }}
                      aria-label="Delete intern application"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={internApplications}
          />
        )}
      </div>

      {selectedApplication && (
        <InternApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onDelete={() => {
            internAppOps.remove(selectedApplication.id);
            setSelectedApplication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

function InternApplicationDetailModal({ application, onClose, onDelete }) {
  const resumePreviewSrc = application.resume
    ? `${application.resume}${application.resume.includes("#") ? "&" : "#"}toolbar=0&navpanes=0&scrollbar=1`
    : "";
  const details = [
    { icon: Users, label: "Full Name", value: application.name },
    { icon: Phone, label: "Phone", value: application.phone },
    { icon: Mail, label: "Email", value: application.email },
    { icon: Briefcase, label: "Applied Role", value: application.role },
    { icon: FileText, label: "Qualification", value: application.qualification },
    { icon: Clock3, label: "Duration", value: application.duration },
    { icon: MapPin, label: "Address", value: application.address },
    { icon: CalendarDays, label: "Applied On", value: application.date },
    { icon: Star, label: "Skills", value: application.skills },
    { icon: MessageSquare, label: "Message", value: application.message },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex max-h-[78vh] w-full max-w-[1008px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-9">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
                {application.name?.slice(0, 1)?.toUpperCase() || "A"}
              </span>
              <div>
                <h2 className="text-xl font-bold leading-tight text-foreground">{application.name}</h2>
                <p className="text-sm text-muted-foreground sm:text-base">{application.role}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close intern application details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-9">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Applicant Details
            </h3>
            <div className="grid gap-x-9 gap-y-3 md:grid-cols-2">
              {details.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex items-center gap-4 border-b border-border pb-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="truncate text-base font-semibold text-foreground">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Document</h3>
                {application.resume && (
                  <a
                    href={application.resume}
                    download={application.resumeName || "resume"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline sm:text-base"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                )}
              </div>
              {application.resume ? (
                <div className="overflow-hidden rounded-2xl border border-border bg-background">
                  <iframe
                    title={`${application.name || "Applicant"} resume`}
                    src={resumePreviewSrc}
                    className="h-[350px] w-full"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                  No document uploaded.
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-9">
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UniversalOfferManagement() {
  const {
    courses = [],
    universalOffer,
    updateUniversalOffer,
    ensureLoaded,
  } = useAdmin();
  const { toast } = useToast();

  useEffect(() => {
    if (ensureLoaded) ensureLoaded("courses");
  }, [ensureLoaded]);

  const [universalForm, setUniversalForm] = useState({
    active: true,
    message: "Vijayadasami offer",
    discountPercent: 30,
    badge: "Top Discount of the Sale",
    deadline: "",
  });
  const [isSavingUniversal, setIsSavingUniversal] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [universalSuccessMsg, setUniversalSuccessMsg] = useState("");

  useEffect(() => {
    if (universalOffer) {
      setUniversalForm({
        active: Boolean(universalOffer.active),
        message: universalOffer.message || "Vijayadasami offer",
        discountPercent:
          universalOffer.discountPercent !== undefined
            ? Number(universalOffer.discountPercent)
            : 30,
        badge: universalOffer.badge || "Top Discount of the Sale",
        deadline: universalOffer.deadline || "",
      });
    }
  }, [universalOffer]);

  const handleToggleMasterOffer = async () => {
    if (isToggling || isSavingUniversal) return;
    const nextActive = !universalForm.active;
    const updatedForm = { ...universalForm, active: nextActive };
    
    // Immediate optimistic local update
    setUniversalForm(updatedForm);
    setIsToggling(true);
    setUniversalSuccessMsg("");

    try {
      await updateUniversalOffer(updatedForm);
      const feedbackMsg = nextActive
        ? `Universal offer is now ENABLED! Applied ${updatedForm.discountPercent}% OFF to all ${courses.length} courses.`
        : `Universal offer is now DISABLED. All ${courses.length} courses returned to standard pricing.`;
      
      setUniversalSuccessMsg(feedbackMsg);
      toast({
        title: nextActive ? "Universal Offer Enabled" : "Universal Offer Disabled",
        description: feedbackMsg,
      });
      setTimeout(() => setUniversalSuccessMsg(""), 5000);
    } catch (err) {
      console.error(err);
      // Revert if API failed
      setUniversalForm((prev) => ({ ...prev, active: !nextActive }));
      toast({
        title: "Toggle Failed",
        description: "Could not update the universal offer status. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsToggling(false);
    }
  };

  const handleSaveUniversalOffer = async (e) => {
    if (e) e.preventDefault();
    setIsSavingUniversal(true);
    setUniversalSuccessMsg("");
    try {
      await updateUniversalOffer(universalForm);
      const feedbackMsg = `Universal offer saved successfully! ${
        universalForm.active
          ? `Active (${universalForm.discountPercent}% OFF)`
          : "Disabled"
      } applied across all ${courses.length} courses.`;
      setUniversalSuccessMsg(feedbackMsg);
      toast({
        title: "Universal Offer Saved",
        description: feedbackMsg,
      });
      setTimeout(() => setUniversalSuccessMsg(""), 5000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Save Failed",
        description: "Failed to save universal offer settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingUniversal(false);
    }
  };

  const discountPresets = [10, 15, 20, 25, 30, 40, 50];
  const messagePresets = [
    "Vijayadasami offer",
    "Diwali Special Offer",
    "Festival Offer",
    "Special Admission Offer",
    "Limited Period Offer",
  ];

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Universal Course Offer
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                universalForm.active
                  ? "bg-purple-600 text-white animate-pulse"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {universalForm.active
                ? `ACTIVE (${universalForm.discountPercent}% OFF)`
                : "OFF (Standard Pricing)"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm max-w-2xl">
            Configure the universal offer here. Changes apply automatically to <strong>all {courses.length} courses</strong> across the website without needing per-course edits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/courses"
            className="rounded-xl border border-border bg-background hover:bg-muted/50 px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Manage Courses ({courses.length})</span>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main Controls Card */}
        <div
          className={`p-6 rounded-3xl border-2 transition-all ${
            universalForm.active
              ? "border-purple-500/50 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent shadow-xl shadow-purple-500/5"
              : "border-border bg-card/60"
          }`}
        >
          {/* Minimal Master Offer Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Master Offer Status
              </h2>
              <p className="text-xs text-muted-foreground">
                Toggle ON to apply discounts across all courses; toggle OFF to revert to regular prices.
              </p>
            </div>

            {/* Minimal Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={universalForm.active}
              onClick={handleToggleMasterOffer}
              disabled={isToggling || isSavingUniversal}
              aria-label={universalForm.active ? "Universal Offer Enabled" : "Universal Offer Disabled"}
              className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold cursor-pointer select-none self-start sm:self-auto ${
                universalForm.active
                  ? "border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  : "border-border bg-muted/40 hover:bg-muted/70 text-muted-foreground"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  universalForm.active ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-neutral-400"
                }`}
              />
              <span>{universalForm.active ? "Universal Offer Enabled" : "Universal Offer Disabled"}</span>
              <div
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 px-0.5 ${
                  universalForm.active ? "bg-purple-600" : "bg-neutral-300 dark:bg-neutral-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    universalForm.active ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveUniversalOffer} className="pt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Message / Title */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide">
                  Offer Message / Headline *
                </label>
                <Input
                  placeholder="e.g. Vijayadasami offer"
                  value={universalForm.message}
                  onChange={(e) =>
                    setUniversalForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="rounded-xl border-border focus-visible:ring-purple-600 font-semibold text-sm h-11"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-muted-foreground mr-1">Quick presets:</span>
                  {messagePresets.map((msg) => (
                    <button
                      key={msg}
                      type="button"
                      onClick={() => setUniversalForm((prev) => ({ ...prev, message: msg }))}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-muted/80 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 text-muted-foreground transition font-medium"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Percentage */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide">
                  Discount Percentage (%) *
                </label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 30"
                  value={universalForm.discountPercent}
                  onChange={(e) =>
                    setUniversalForm((prev) => ({
                      ...prev,
                      discountPercent: Math.min(100, Math.max(0, Number(e.target.value) || 0)),
                    }))
                  }
                  className="rounded-xl border-border focus-visible:ring-purple-600 font-black text-sm h-11 text-emerald-600 dark:text-emerald-400"
                />
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {discountPresets.map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setUniversalForm((prev) => ({ ...prev, discountPercent: pct }))}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-bold transition ${
                        Number(universalForm.discountPercent) === pct
                          ? "bg-purple-600 text-white"
                          : "bg-muted/80 hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide">
                    Offer Expiry (Optional)
                  </label>
                  {universalForm.deadline && (
                    <button
                      type="button"
                      onClick={() => setUniversalForm((prev) => ({ ...prev, deadline: "" }))}
                      className="text-[11px] text-destructive hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <Input
                  type="date"
                  value={universalForm.deadline ? universalForm.deadline.substring(0, 10) : ""}
                  onChange={(e) =>
                    setUniversalForm((prev) => ({ ...prev, deadline: e.target.value }))
                  }
                  className="rounded-xl border-border focus-visible:ring-purple-600 font-medium text-sm h-11"
                />
                <p className="text-[11px] text-muted-foreground">
                  {universalForm.deadline
                    ? `Offer ends on ${new Date(universalForm.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`
                    : "No expiry (runs continuously)"}
                </p>
              </div>

              {/* Badge Tag */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide">
                  Secondary Tag (Optional)
                </label>
                <Input
                  placeholder="e.g. Top Discount of the Sale"
                  value={universalForm.badge}
                  onChange={(e) => setUniversalForm((prev) => ({ ...prev, badge: e.target.value }))}
                  className="rounded-xl border-border focus-visible:ring-purple-600 text-sm h-11"
                />
              </div>
            </div>

            {/* Live Card Preview */}
            <div className="rounded-2xl border border-purple-500/30 bg-background/90 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm">
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Live Preview on Course Pricing Cards:
                </span>
                <div className="flex flex-col items-start gap-1.5 p-3 rounded-xl bg-muted/20 border border-border/60">
                  <span className="inline-block text-xs font-bold text-white bg-[#8a0bd6] dark:bg-[#9914ec] px-3 py-1 rounded-md leading-none shadow-sm">
                    {universalForm.message || "Vijayadasami offer"}
                  </span>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-black text-2xl text-[#0d8744] dark:text-[#22c55e] inline-flex items-center leading-none">
                      <ArrowDown className="w-5 h-5 stroke-[3.5] mr-0.5" />
                      <span>{universalForm.discountPercent || 30}%</span>
                    </span>
                    <span className="line-through font-bold text-base text-neutral-400 leading-none">
                      ₹30,000
                    </span>
                    <span className="font-black text-3xl text-neutral-900 dark:text-white leading-none tracking-tight">
                      {formatRupees(Math.round(30000 * (1 - (universalForm.discountPercent || 30) / 100)))}
                    </span>
                  </div>
                  {universalForm.deadline && (
                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1 mt-1">
                      <Clock3 className="w-3 h-3" />
                      <span>Valid till {new Date(universalForm.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Action Buttons */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                {universalSuccessMsg && (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Saved</span>
                  </span>
                )}

                <Button
                  type="submit"
                  disabled={isSavingUniversal}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold h-9 px-4 rounded-xl shadow-sm transition-all flex items-center gap-1.5 text-xs shrink-0"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingUniversal ? "Saving..." : "Save Changes"}</span>
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Live Course Breakdown Table showing EVERY course */}
        <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">
                Live Pricing Breakdown Across All Courses ({courses.length})
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Here is the exact pricing calculated for every course with the current offer settings.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary w-fit">
              {universalForm.active ? `Universal ${universalForm.discountPercent}% OFF Active` : "Standard Pricing Active"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {courses.map((course) => {
              const bp = course.basicPlan || {};
              const ap = course.advancedPlan || {};
              const bpOriginal = parseNumericPrice(bp.price) || 30000;
              const bpDiscounted = universalForm.active
                ? Math.round(bpOriginal * (1 - (universalForm.discountPercent || 30) / 100))
                : bpOriginal;

              const hasAp = ap && ap.price && ap.price.trim() !== "" && ap.price !== "₹0";
              const apOriginal = hasAp ? parseNumericPrice(ap.price) || 60000 : null;
              const apDiscounted = (hasAp && universalForm.active)
                ? Math.round(apOriginal * (1 - (universalForm.discountPercent || 30) / 100))
                : apOriginal;

              return (
                <div
                  key={course.id}
                  className="rounded-2xl border border-border/80 bg-background/60 p-4 space-y-3 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-sm text-foreground leading-tight line-clamp-1">
                        {course.title}
                      </h3>
                      <Link
                        to={getCourseUrl(course)}
                        target="_blank"
                        className="text-muted-foreground hover:text-primary transition p-1"
                        title="View Course Page"
                      >
                        <ExternalLink size={13} />
                      </Link>
                    </div>
                    {course.duration && (
                      <span className="text-[11px] text-muted-foreground block">
                        {course.duration}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                    {/* Basic Plan */}
                    <div className="flex items-center justify-between gap-2 bg-muted/30 px-2.5 py-1.5 rounded-lg">
                      <span className="font-semibold text-muted-foreground">
                        {bp.name || "Basic Plan"}:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {universalForm.active && (
                          <span className="line-through text-neutral-400 text-[11px]">
                            {formatRupees(bpOriginal)}
                          </span>
                        )}
                        <span className="font-black text-foreground">
                          {formatRupees(bpDiscounted)}
                        </span>
                      </div>
                    </div>

                    {/* Advanced Plan if present */}
                    {hasAp && (
                      <div className="flex items-center justify-between gap-2 bg-muted/30 px-2.5 py-1.5 rounded-lg">
                        <span className="font-semibold text-muted-foreground">
                          {ap.name || "Advanced"}:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {universalForm.active && (
                            <span className="line-through text-neutral-400 text-[11px]">
                              {formatRupees(apOriginal)}
                            </span>
                          )}
                          <span className="font-black text-foreground">
                            {formatRupees(apDiscounted)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className={`font-bold ${universalForm.active ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"}`}>
                      {universalForm.active ? `✓ ${universalForm.discountPercent}% OFF Applied` : "Standard Pricing"}
                    </span>
                    <span className="text-muted-foreground">
                      {course.mode || "Classroom"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export function CourseManagement() {
  const {
    courses,
    courseOps,
    courseApplications,
    courseAppOps,
    universalOffer,
    updateUniversalOffer,
  } = useAdmin();
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Universal Offer state
  const [universalForm, setUniversalForm] = useState({
    active: true,
    message: "Vijayadasami offer",
    discountPercent: 30,
    badge: "Top Discount of the Sale",
    deadline: "",
  });
  const [isSavingUniversal, setIsSavingUniversal] = useState(false);
  const [universalSuccessMsg, setUniversalSuccessMsg] = useState("");

  useEffect(() => {
    if (universalOffer) {
      setUniversalForm({
        active: Boolean(universalOffer.active),
        message: universalOffer.message || "Vijayadasami offer",
        discountPercent:
          universalOffer.discountPercent !== undefined
            ? universalOffer.discountPercent
            : 30,
        badge: universalOffer.badge || "Top Discount of the Sale",
        deadline: universalOffer.deadline || "",
      });
    }
  }, [universalOffer]);

  const handleSaveUniversalOffer = async (e) => {
    if (e) e.preventDefault();
    setIsSavingUniversal(true);
    setUniversalSuccessMsg("");
    try {
      await updateUniversalOffer(universalForm);
      setUniversalSuccessMsg("Universal offer updated and applied to all courses successfully!");
      setTimeout(() => setUniversalSuccessMsg(""), 4000);
    } catch (err) {
      console.error(err);
      alert("Failed to save universal offer.");
    } finally {
      setIsSavingUniversal(false);
    }
  };

  // Course Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [activeModalSection, setActiveModalSection] = useState("basic");

  const defaultCourseForm = {
    title: "Digital Marketing Course",
    slug: "digital-marketing-course",
    badge: "DIGITAL MARKETING COURSE",
    headline: "Learn. Implement. Grow.",
    description: "Master in-demand digital marketing skills and build your career in the fastest growing industry. Our comprehensive program gives you complete understanding from basics to live projects.",
    duration: "3 & 6 Months",
    mode: "Offline Classroom Training",
    certificate: "Certificate of Completion",
    techStack: "Meta Ads, Instagram, YouTube, Facebook, WhatsApp, SEO, Google Analytics",
    highlight1: "13+ Modules | Hands-on Training",
    highlight1Icon: "book-open",
    highlight2: "Live Real-World Projects & Case Studies",
    highlight2Icon: "briefcase",
    highlight3: "Industry Expert Trainers & Mentors",
    highlight3Icon: "users",
    highlight4: "100% Placement & Freelance Guidance",
    highlight4Icon: "award",
    plansCount: 2,
    basicPlanName: "Basic Foundation",
    basicPlanDuration: "3 Months",
    basicPlanPrice: "₹30,000",
    basicPlanFeatures: "Digital Marketing Fundamentals\nSocial Media Marketing (Meta, Insta, FB)\nSEO Basics & Content Strategy\nPerformance Marketing & Ads Setup\n1-2 Live Campaign Projects\nCertificate of Completion",
    advancedPlanName: "Advanced Mastery",
    advancedPlanDuration: "6 Months",
    advancedPlanPrice: "₹60,000",
    advancedPlanFeatures: "Complete 13+ Advanced Modules\nAdvanced Performance & Paid Ad Strategies\nSearch Engine Optimization (SEO) & Analytics\nFreelancing, Client Acquisition & Monetization\nMultiple Live Client Projects & Budget Execution\n100% Placement Support & Career Mentorship",
    imageUrl: "/images/course-students.png",
    offerActive: false,
    offerBadge: "Top Discount of the Sale",
    offerPrice: "",
    originalPrice: "",
    offerDeadline: "",
    discountPercent: 0,
    offerMessage: "",
  };

  const [formData, setFormData] = useState(defaultCourseForm);

  const populateForm = (course) => {
    const hl = course.highlights || [];
    const getHl = (i) => (hl[i] ? (typeof hl[i] === "string" ? hl[i] : hl[i].title || "") : "");
    const getHlIcon = (i, fallback) => (hl[i] && typeof hl[i] === "object" && hl[i].icon ? hl[i].icon : fallback);
    const bp = course.basicPlan || {};
    const ap = course.advancedPlan || {};
    const isSinglePlan =
      course.plansCount === 1 ||
      (!ap.name && !ap.price && !ap.duration) ||
      (ap.price && ap.price.trim() === "") ||
      ap.price === "₹0" ||
      ap.price === "0";
    return {
      title: course.title || "",
      slug: course.slug || "",
      badge: course.badge || "",
      headline: course.headline || "",
      description: course.description || "",
      duration: course.duration || "3 & 6 Months",
      mode: course.mode && !course.mode.toLowerCase().includes("online") ? course.mode : "Offline Classroom Training",
      certificate: course.certificate || "Certificate Included",
      techStack: Array.isArray(course.techStack) ? course.techStack.join(", ") : (course.techStack || ""),
      highlight1: getHl(0) || "Understand design principles and layouts",
      highlight1Icon: getHlIcon(0, "palette"),
      highlight2: getHl(1) || "Create strong visual identities",
      highlight2Icon: getHlIcon(1, "sparkles"),
      highlight3: getHl(2) || "Photoshop, Illustrator, InDesign & more",
      highlight3Icon: getHlIcon(2, "layers"),
      highlight4: getHl(3) || "Work on real projects & build your portfolio",
      highlight4Icon: getHlIcon(3, "folder"),
      plansCount: isSinglePlan ? 1 : 2,
      basicPlanName: bp.name || (isSinglePlan ? "Standard" : "Basic"),
      basicPlanDuration: bp.duration || course.duration || "3 Months",
      basicPlanPrice: bp.price || "₹30,000",
      basicPlanFeatures: Array.isArray(bp.features) ? bp.features.join("\n") : (bp.features || ""),
      advancedPlanName: ap.name || "Advanced",
      advancedPlanDuration: ap.duration || "6 Months",
      advancedPlanPrice: ap.price || "₹60,000",
      advancedPlanFeatures: Array.isArray(ap.features) ? ap.features.join("\n") : (ap.features || ""),
      imageUrl: course.imageUrl || "/images/course-students.png",
      offerActive: Boolean(course.offerActive ?? course.offer_active),
      offerBadge: course.offerBadge || course.offer_badge || "Top Discount of the Sale",
      offerPrice: course.offerPrice || course.offer_price || "",
      originalPrice: course.originalPrice || course.original_price || "",
      offerDeadline: course.offerDeadline || course.offer_deadline || "",
      discountPercent: course.discountPercent ?? course.discount_percent ?? 0,
      offerMessage: course.offerMessage || course.offer_message || "",
    };
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setFormData(defaultCourseForm);
    setActiveModalSection("basic");
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData(populateForm(course));
    setActiveModalSection("basic");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setFormData(defaultCourseForm);
  };

  const handleFormChange = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || "",
        badge: formData.badge,
        headline: formData.headline,
        description: formData.description,
        duration: formData.duration,
        mode: formData.mode,
        certificate: formData.certificate,
        techStack: formData.techStack
          ? formData.techStack.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
        highlights: [
          { title: formData.highlight1, icon: formData.highlight1Icon || "palette" },
          { title: formData.highlight2, icon: formData.highlight2Icon || "sparkles" },
          { title: formData.highlight3, icon: formData.highlight3Icon || "layers" },
          { title: formData.highlight4, icon: formData.highlight4Icon || "folder" },
        ].filter((h) => Boolean(h.title)),
        plansCount: Number(formData.plansCount) || 2,
        basicPlan: {
          name: formData.basicPlanName || "Basic",
          duration: formData.basicPlanDuration || "3 Months",
          price: formData.basicPlanPrice || "₹30,000",
          features: formData.basicPlanFeatures
            ? formData.basicPlanFeatures.split("\n").map((s) => s.trim()).filter(Boolean)
            : [],
        },
        advancedPlan:
          Number(formData.plansCount) === 1
            ? null
            : {
                name: formData.advancedPlanName || "Advanced",
                duration: formData.advancedPlanDuration || "6 Months",
                price: formData.advancedPlanPrice || "₹60,000",
                features: formData.advancedPlanFeatures
                  ? formData.advancedPlanFeatures.split("\n").map((s) => s.trim()).filter(Boolean)
                  : [],
              },
        imageUrl: formData.imageUrl || "/images/course-students.png",
      };

      if (editingCourse) {
        await courseOps.update(editingCourse.id, payload);
      } else {
        await courseOps.add(payload);
      }
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save course. Please check inputs and try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleMoveCourse = async (currentIndex, direction) => {
    const targetIndex = currentIndex + direction;
    if (targetIndex < 0 || targetIndex >= courses.length) return;

    const newCourses = [...courses];
    const [movedCourse] = newCourses.splice(currentIndex, 1);
    newCourses.splice(targetIndex, 0, movedCourse);

    const reorderedPayload = newCourses.map((c, idx) => ({
      id: c.id,
      orderIndex: idx,
    }));

    try {
      if (courseOps.reorder) {
        await courseOps.reorder(reorderedPayload);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update course order.");
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Course Management
          </h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-base">
            Customize course order, landing page contents (headline, highlights, pricing plans) for each course.
          </p>
        </div>
        {activeTab === "courses" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={openCreateModal}
          >
            <Plus className="h-5 w-5" />
            Add Course
          </Button>
        ) : (
          <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary md:text-base">
            {courseApplications.length} Applications
          </span>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex w-fit items-center rounded-2xl bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            className={`rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "courses"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Courses ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-3 rounded-xl px-6 py-3 text-sm font-semibold transition md:text-base ${
              activeTab === "applications"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Applications
            <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
              {courseApplications.length}
            </span>
          </button>
        </div>

        {activeTab === "courses" ? (
          <div className="space-y-6">
            {/* Universal Course Offer Banner in CourseManagement */}
            <div className={`p-5 rounded-2xl border-2 transition-all ${
              universalOffer?.active
                ? "border-purple-500/40 bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent shadow-md shadow-purple-500/5"
                : "border-border bg-card/60"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    universalOffer?.active
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-base text-foreground">
                        Universal Course Offer
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        universalOffer?.active ? "bg-purple-600 text-white animate-pulse" : "bg-muted text-muted-foreground"
                      }`}>
                        {universalOffer?.active ? `ACTIVE (${universalOffer?.discountPercent}% OFF)` : "DISABLED"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {universalOffer?.active
                        ? `Applied to all ${courses.length} courses: "${universalOffer?.message || 'Vijayadasami offer'}" • ↓${universalOffer?.discountPercent}% discount`
                        : "Universal offer is currently turned off. All courses show standard prices."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="flex items-center gap-2 bg-background/80 border border-border px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-semibold text-foreground">
                      {universalOffer?.active ? "Active" : "Off"}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer" title="Quick toggle universal offer">
                      <input
                        type="checkbox"
                        checked={Boolean(universalOffer?.active)}
                        onChange={async () => {
                          const next = !Boolean(universalOffer?.active);
                          try {
                            await updateUniversalOffer({
                              ...universalOffer,
                              active: next,
                            });
                          } catch (err) {
                            console.error(err);
                            alert("Failed to toggle universal offer");
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>

                  <Link
                    to="/admin/universal-offer"
                    className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 shadow-sm transition flex items-center gap-1.5"
                  >
                    <span>Universal Offer Settings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            <DataTable
              columns={[
                {
                  key: "order",
                  label: "Order",
                  render: (_, row) => {
                    const currentIndex = courses.findIndex((c) => c.id === row.id);
                    return (
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-muted-foreground w-6 text-center">
                          {currentIndex + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-20"
                            disabled={currentIndex === 0}
                            onClick={() => handleMoveCourse(currentIndex, -1)}
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground disabled:opacity-20"
                            disabled={currentIndex === courses.length - 1}
                            onClick={() => handleMoveCourse(currentIndex, 1)}
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </Button>
                        </div>
                      </div>
                    );
                  },
                },
                {
                  key: "title",
                  label: "Course Details",
                  render: (_, row) => (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{row.title}</span>
                        {row.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                            {row.badge}
                          </span>
                        )}
                      </div>
                      {row.headline && (
                        <p className="text-xs text-muted-foreground italic line-clamp-1">
                          "{row.headline}"
                        </p>
                      )}
                    </div>
                  ),
                },
                {
                  key: "duration",
                  label: "Duration & Mode",
                  render: (_, row) => (
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium text-foreground">{row.duration || "3 & 6 Months"}</div>
                      <div className="text-muted-foreground">
                        {row.mode && !row.mode.toLowerCase().includes("online") ? row.mode : "Offline Classroom Training"}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "plans",
                  label: "Plans / Pricing",
                  render: (_, row) => {
                    const bp = row.basicPlan || {};
                    const ap = row.advancedPlan || {};
                    const hasAp =
                      row.plansCount !== 1 &&
                      ap &&
                      (Boolean(ap.name) || Boolean(ap.price)) &&
                      Boolean(ap.price?.trim()) &&
                      ap.price?.trim() !== "₹0" &&
                      ap.price?.trim() !== "0";

                    const offerOn = isOfferValid(row);
                    const deadlineLabel = getOfferDeadlineLabel(row.offerDeadline);

                    return (
                      <div className="text-xs space-y-1">
                        <div className="text-foreground">
                          <strong>{bp.name || "Plan"}:</strong> {bp.price || "₹30,000"} ({bp.duration || "3 Months"})
                        </div>
                        {hasAp ? (
                          <div className="text-foreground">
                            <strong>{ap.name || "Advanced"}:</strong> {ap.price || "₹60,000"} ({ap.duration || "6 Months"})
                          </div>
                        ) : (
                          <div className="text-muted-foreground text-[11px] italic">
                            (Single Plan Only)
                          </div>
                        )}
                        {offerOn && (
                          <div className="pt-1 border-t border-border/40 space-y-0.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#8a0bd6] text-white">
                                <Flame className="w-2.5 h-2.5" />
                                {row.offerMessage || row.offerBadge || "Special Offer"}
                              </span>
                              {(Number(row.discountPercent) > 0 || (row.originalPrice && row.offerPrice)) && (
                                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                                  {Number(row.discountPercent) > 0 ? `↓${row.discountPercent}% OFF` : ""}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-foreground font-semibold">
                              <span>Offer: {row.offerPrice || "Discount Applied"}</span>
                              {row.originalPrice && (
                                <span className="ml-1 text-[10px] line-through text-muted-foreground font-normal">
                                  {row.originalPrice}
                                </span>
                              )}
                            </div>
                            {deadlineLabel && (
                              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                                {deadlineLabel}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  },
                },
                {
                  key: "actions",
                  label: "Actions",
                  render: (_, row) => (
                    <div className="flex items-center gap-2">
                      <a
                        href={getCourseUrl(row)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline px-2.5 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                        title="View Course Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Preview
                      </a>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => openEditModal(row)}
                        title="Edit Course Content"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete course "${row.title}"?`)) {
                            courseOps.remove(row.id);
                          }
                        }}
                        title="Delete Course"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={courses}
            />
          </div>
        ) : (
          <DataTable
            columns={[
              {
                key: "name",
                label: "Applicant",
                render: (value) => (
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {value?.slice(0, 1)?.toUpperCase() || "A"}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ),
              },
              {
                key: "email",
                label: "Email",
                render: (value) =>
                  value ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No email"
                  ),
              },
              {
                key: "phone",
                label: "Phone",
                render: (value) =>
                  value ? (
                    <a
                      href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                      className="text-primary hover:underline"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {value}
                    </a>
                  ) : (
                    "No phone"
                  ),
              },
              { key: "courseTitle", label: "Course" },
              { key: "date", label: "Applied On" },
              {
                key: "actions",
                label: "Actions",
                render: (_, row) => (
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedApplication(row);
                      }}
                      aria-label="View course application"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg p-1 text-foreground hover:bg-muted"
                      onClick={(event) => {
                        event.stopPropagation();
                        courseAppOps.remove(row.id);
                      }}
                      aria-label="Delete course application"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ),
              },
            ]}
            data={courseApplications}
          />
        )}
      </div>

      {/* Course Edit/Create Modal with Right-Side Content Fields */}
      {isModalOpen && (
        <FormModal
          title={editingCourse ? `Edit Course: ${editingCourse.title}` : "Create New Course"}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          submitting={formSubmitting}
        >
          {/* Section Navigation Tabs inside Modal */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-muted/40 rounded-xl mb-4 border border-border">
            {[
              { id: "basic", label: "1. Basic Info" },
              { id: "highlights", label: "2. Right Highlights (4)" },
              { id: "plans", label: "3. Pricing Plans" },
              { id: "offer", label: "4. Universal Offer 🏷️" },
              { id: "visuals", label: "5. Visuals & Mode" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveModalSection(tab.id)}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all ${
                  activeModalSection === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section 1: Basic Information */}
          {activeModalSection === "basic" && (
            <div className="space-y-4">
              <TextField
                label="Course Title *"
                placeholder="e.g. Graphic Design Course"
                value={formData.title}
                onChange={handleFormChange("title")}
                required
              />
              <TextField
                label="URL Slug (Optional - auto-generated from title if blank)"
                placeholder="e.g. fullstack-development or digital-marketing"
                value={formData.slug}
                onChange={handleFormChange("slug")}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField
                  label="Category Badge"
                  placeholder="e.g. GRAPHIC DESIGN COURSE"
                  value={formData.badge}
                  onChange={handleFormChange("badge")}
                />
                <TextField
                  label="Duration Text"
                  placeholder="e.g. 3 & 6 Months"
                  value={formData.duration}
                  onChange={handleFormChange("duration")}
                  required
                />
              </div>
              <TextField
                label="Headline (Right Side Big Title)"
                placeholder="e.g. Turn Creativity into a Career."
                value={formData.headline}
                onChange={handleFormChange("headline")}
              />
              <TextField
                label="Course Description"
                placeholder="Overview of curriculum and objectives..."
                value={formData.description}
                onChange={handleFormChange("description")}
                textarea
                required
              />
              <TextField
                label="Tech Stack / Software Tools (comma-separated)"
                placeholder="Photoshop, Illustrator, InDesign, Figma"
                value={formData.techStack}
                onChange={handleFormChange("techStack")}
              />
            </div>
          )}

          {/* Section 2: Right Side 4 Highlights with Icon Selection */}
          {activeModalSection === "highlights" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Select an icon and enter the description for each of the 4 highlight cards displayed on the course landing page.
              </p>

              {[
                { key: "highlight1", iconKey: "highlight1Icon", label: "Highlight 1", defaultIcon: "palette" },
                { key: "highlight2", iconKey: "highlight2Icon", label: "Highlight 2", defaultIcon: "sparkles" },
                { key: "highlight3", iconKey: "highlight3Icon", label: "Highlight 3", defaultIcon: "layers" },
                { key: "highlight4", iconKey: "highlight4Icon", label: "Highlight 4", defaultIcon: "folder" },
              ].map(({ key, iconKey, label }) => {
                const currentIconId = formData[iconKey] || "palette";
                const matchedIcon = AVAILABLE_COURSE_ICONS.find((i) => i.id === currentIconId) || AVAILABLE_COURSE_ICONS[0];
                const IconComponent = matchedIcon.icon;

                return (
                  <div key={key} className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{label}</span>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
                        <IconComponent className="w-3.5 h-3.5" />
                        <span>{matchedIcon.label}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-8">
                        <TextField
                          placeholder="e.g. Master modern design techniques & layouts"
                          value={formData[key]}
                          onChange={handleFormChange(key)}
                        />
                      </div>
                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-[11px] font-semibold text-muted-foreground block">Choose Icon</label>
                        <select
                          value={formData[iconKey] || "palette"}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [iconKey]: e.target.value }))}
                          className="w-full text-xs rounded-xl border border-border bg-background px-2.5 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        >
                          {AVAILABLE_COURSE_ICONS.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick-pick Icon Grid */}
                    <div className="pt-1">
                      <span className="text-[10px] text-muted-foreground block mb-1.5 font-medium">Quick Icon Picks:</span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 rounded-lg border border-border/40 bg-background/50">
                        {AVAILABLE_COURSE_ICONS.map((opt) => {
                          const ItemIcon = opt.icon;
                          const isSelected = (formData[iconKey] || "palette") === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, [iconKey]: opt.id }))}
                              title={opt.label}
                              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                                isSelected
                                  ? "bg-primary text-white border-primary shadow-sm scale-105"
                                  : "bg-muted/40 border-transparent hover:border-primary/40 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <ItemIcon className="w-3.5 h-3.5" />
                              <span className="text-[10px] hidden md:inline">{opt.label.split("/")[0].trim()}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section 3: Pricing Plans */}
          {activeModalSection === "plans" && (
            <div className="space-y-6">
              {/* Plan Mode Selector */}
              <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-foreground">
                    Number of Pricing Plans
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Choose whether this course has a single pricing plan or two tiers (e.g. Basic & Advanced).
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-background rounded-lg border border-border shrink-0">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, plansCount: 1 }))}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      Number(formData.plansCount) === 1
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    1 Single Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, plansCount: 2 }))}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      Number(formData.plansCount) === 2
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    2 Plans (Basic & Adv)
                  </button>
                </div>
              </div>

              {/* Plan 1: Basic / Standard Plan */}
              <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                <h4 className="font-bold text-sm text-foreground flex items-center justify-between">
                  <span>
                    {Number(formData.plansCount) === 1 ? "Course Pricing Plan" : "Plan 1: Basic Plan Card"}
                  </span>
                  <span className="text-xs text-primary font-semibold">
                    {Number(formData.plansCount) === 1 ? "Single Tier" : "Tier 1"}
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <TextField
                    label="Plan Name"
                    placeholder={Number(formData.plansCount) === 1 ? "Standard" : "Basic"}
                    value={formData.basicPlanName}
                    onChange={handleFormChange("basicPlanName")}
                  />
                  <TextField
                    label="Duration"
                    placeholder="3 Months"
                    value={formData.basicPlanDuration}
                    onChange={handleFormChange("basicPlanDuration")}
                  />
                  <TextField
                    label="Price"
                    placeholder="₹30,000"
                    value={formData.basicPlanPrice}
                    onChange={handleFormChange("basicPlanPrice")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Features (one bullet point per line)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full text-xs p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Design principles & typography&#10;Basic tools and techniques&#10;1-2 mini projects&#10;Professional guidance"
                    value={formData.basicPlanFeatures}
                    onChange={handleFormChange("basicPlanFeatures")}
                  />
                </div>
              </div>

              {/* Plan 2: Advanced Plan (Visible only when 2 plans are selected) */}
              {Number(formData.plansCount) === 2 && (
                <div className="p-4 rounded-xl border border-border bg-muted/20 space-y-3">
                  <h4 className="font-bold text-sm text-foreground flex items-center justify-between">
                    <span>Plan 2: Advanced Plan Card</span>
                    <span className="text-xs text-primary font-semibold">Tier 2</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <TextField
                      label="Plan Name"
                      placeholder="Advanced"
                      value={formData.advancedPlanName}
                      onChange={handleFormChange("advancedPlanName")}
                    />
                    <TextField
                      label="Duration"
                      placeholder="6 Months"
                      value={formData.advancedPlanDuration}
                      onChange={handleFormChange("advancedPlanDuration")}
                    />
                    <TextField
                      label="Price"
                      placeholder="₹60,000"
                      value={formData.advancedPlanPrice}
                      onChange={handleFormChange("advancedPlanPrice")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Features (one bullet point per line)
                    </label>
                    <textarea
                      rows={4}
                      className="w-full text-xs p-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Advanced design & branding&#10;Social media & print design&#10;Real-world projects&#10;Portfolio development & career support"
                      value={formData.advancedPlanFeatures}
                      onChange={handleFormChange("advancedPlanFeatures")}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Universal Offer Overview */}
          {activeModalSection === "offer" && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border-2 border-purple-500/30 bg-purple-500/5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${
                      universalOffer?.active ? "bg-purple-600 shadow-md shadow-purple-600/30" : "bg-muted text-muted-foreground"
                    }`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-base text-foreground">
                          Universal Course Offer
                        </h4>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          universalOffer?.active ? "bg-purple-600 text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {universalOffer?.active ? `ACTIVE (${universalOffer?.discountPercent}% OFF)` : "OFF"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Course offers are managed universally across all courses so all pricing stays 100% consistent.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/admin/universal-offer"
                    className="shrink-0 text-xs font-semibold px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Configure Offer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-200 dark:border-purple-900/40 text-xs">
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground block text-[11px]">Campaign Title</span>
                    <span className="font-bold text-foreground text-sm">{universalOffer?.message || "Vijayadasami offer"}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground block text-[11px]">Discount Percentage</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">↓{universalOffer?.discountPercent || 30}% OFF</span>
                  </div>
                  <div className="p-3 rounded-xl bg-background border border-border">
                    <span className="text-muted-foreground block text-[11px]">Global Status</span>
                    <span className="font-semibold text-foreground text-sm">
                      {universalOffer?.active ? "Applied to all courses" : "Disabled (Standard Price)"}
                    </span>
                  </div>
                </div>

                {/* Live Preview on this specific course */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                    Live Display on this Course:
                  </span>
                  <div className="p-4 rounded-xl bg-background border border-border flex items-center justify-start shadow-inner">
                    <CourseOfferPriceDisplay
                      offerBadge={universalOffer?.badge || "Top Discount of the Sale"}
                      offerMessage={universalOffer?.message || "Vijayadasami offer"}
                      discountPercent={Number(universalOffer?.discountPercent) || 30}
                      originalPrice={formData.basicPlanPrice || "₹30,000"}
                      offerDeadline={universalOffer?.deadline}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Visuals, Mode & Certificate */}
          {activeModalSection === "visuals" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField
                  label="Learning Mode (Bottom Bar)"
                  placeholder="Offline Classroom Training"
                  value={formData.mode}
                  onChange={handleFormChange("mode")}
                />
                <TextField
                  label="Certificate (Bottom Bar)"
                  placeholder="Certificate Included"
                  value={formData.certificate}
                  onChange={handleFormChange("certificate")}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Left Side Student Image URL
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="/images/course-students.png"
                    value={formData.imageUrl}
                    onChange={handleFormChange("imageUrl")}
                    className="text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 text-xs"
                    onClick={() => setFormData((p) => ({ ...p, imageUrl: "/images/course-students.png" }))}
                  >
                    Reset Default
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Default: <code>/images/course-students.png</code> (the inserted students cutout).
                </p>
                {formData.imageUrl && (
                  <div className="mt-3 p-3 bg-muted/30 rounded-xl border border-border flex items-center gap-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-16 h-16 object-contain rounded-lg bg-emerald-100/30 p-1 border border-emerald-200"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-foreground">Current Image Preview</span>
                      <p className="text-muted-foreground text-[11px] truncate max-w-xs">{formData.imageUrl}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </FormModal>
      )}

      {selectedApplication && (
        <CourseApplicationDetailModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onDelete={() => {
            courseAppOps.remove(selectedApplication.id);
            setSelectedApplication(null);
          }}
        />
      )}
    </AdminLayout>
  );
}

function CourseApplicationDetailModal({ application, onClose, onDelete }) {
  const details = [
    { icon: Users, label: "Full Name", value: application.name },
    { icon: Phone, label: "Phone", value: application.phone },
    { icon: Mail, label: "Email", value: application.email },
    { icon: BookOpen, label: "Course", value: application.courseTitle },
    { icon: MessageSquare, label: "Message", value: application.message },
    { icon: CalendarDays, label: "Applied On", value: application.date },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex max-h-[78vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-9">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold text-foreground">Course Application</h2>
                <p className="text-sm text-muted-foreground">{application.name}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close course application details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-9">
            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-5 border-b border-border py-4 last:border-0">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="break-words text-lg font-semibold text-foreground">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-background px-5 py-4 sm:px-9">
            <Button type="button" variant="outline" onClick={onDelete}>
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotoManagement() {
  const { sitePhotos, sitePhotoOps } = useAdmin();
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [sizeWarning, setSizeWarning] = useState(false);

  const resetUploadForm = () => {
    setName("");
    setPreview("");
    setSizeWarning(false);
    setIsUploadOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSizeWarning(file.size > 5 * 1024 * 1024);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result?.toString() || "");
      if (!name) {
        setName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (!preview) return;
    sitePhotoOps.add({ name: name || "Uploaded Photo", url: preview });
    resetUploadForm();
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="Photo Management"
        description="Upload local images or store external URLs for the site gallery."
        action={<Button onClick={() => setIsUploadOpen(true)}>Upload Photo</Button>}
      />

      <div className="grid gap-6">
        <div className="glass-card rounded-2xl p-5">
          {sitePhotos.length === 0 ? (
            <p className="text-sm text-muted-foreground">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {sitePhotos.map((photo) => (
                <div key={photo.id} className="rounded-2xl overflow-hidden border border-border bg-card">
                  <img src={photo.url} alt={photo.name} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <p className="font-medium truncate">{photo.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => sitePhotoOps.remove(photo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isUploadOpen && (
        <FormModal
          title="Upload Photo"
          onClose={resetUploadForm}
          onSubmit={handleAdd}
          submitting={false}
        >
          <TextField
            label="Photo Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Homepage banner"
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Choose File</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {sizeWarning && (
              <p className="text-xs text-amber-500 font-medium">⚠ Image exceeds 5 MB. For best performance, upload images under 5 MB.</p>
            )}
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full aspect-video object-cover rounded-xl border border-border"
            />
          )}
        </FormModal>
      )}
    </AdminLayout>
  );
}

export function ServiceRequestManagement() {
  const { serviceRequests, serviceRequestOps } = useAdmin();
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Client Service Requests
        </h1>
        <p className="mt-1 text-sm text-muted-foreground md:text-base">
          {serviceRequests.length} total requests
        </p>
      </div>

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          {
            key: "email",
            label: "Email",
            render: (value) =>
              value ? (
                <a
                  href={`mailto:${value}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No email"
              ),
          },
          {
            key: "phone",
            label: "Phone",
            className: "hidden",
            render: (value) =>
              value ? (
                <a
                  href={`tel:${String(value).replace(/[^\d+]/g, "")}`}
                  className="hover:text-primary hover:underline"
                  onClick={(event) => event.stopPropagation()}
                >
                  {value}
                </a>
              ) : (
                "No phone"
              ),
          },
          { key: "services", label: "Services" },
          { key: "date", label: "Date" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                {value || "New"}
              </span>
            ),
          },
          {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRequest(row);
                  }}
                  aria-label="View request details"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="rounded-lg p-1 text-foreground hover:bg-muted"
                  onClick={(event) => {
                    event.stopPropagation();
                    serviceRequestOps.remove(row.id);
                  }}
                  aria-label="Delete request"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ),
          },
        ]}
        data={serviceRequests}
      />

      {selectedRequest && (
        <ServiceRequestDetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onStatusChange={(status) => {
            serviceRequestOps.update(selectedRequest.id, { status });
            setSelectedRequest((prev) => ({ ...prev, status }));
          }}
        />
      )}
    </AdminLayout>
  );
}

function ServiceRequestDetailModal({ request, onClose, onStatusChange }) {
  const currentStatus = request.status || "New";
  const details = [
    { icon: Users, label: "Name", value: request.name },
    { icon: Mail, label: "Email", value: request.email },
    { icon: Phone, label: "Phone", value: request.phone },
    { icon: Building2, label: "Company", value: request.company },
    { icon: Tag, label: "Services", value: request.services },
    { icon: List, label: "Sub-Services", value: request.subServices || request.timeline },
    { icon: FileText, label: "Project Details", value: request.projectDetails },
    { icon: CalendarDays, label: "Date", value: request.date },
  ];
  const statusOptions = ["New", "In Review", "Completed", "Rejected"];

  return (
    <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="flex h-[77vh] w-full max-w-[660px] flex-col overflow-hidden rounded-[22px] border border-border bg-background shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <Layers className="h-5 w-5" />
              </span>
              <h2 className="text-xl font-bold text-foreground">Request Details</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500">
                {currentStatus}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close request details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="flex items-start gap-5 border-b border-border py-4 last:border-0">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    <p className="break-words text-lg font-semibold text-foreground">
                      {item.value || "Not provided"}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-border pt-5 pb-1">
              <p className="mb-4 text-sm font-medium text-muted-foreground">Update Status</p>
              <div className="grid grid-cols-2 gap-3">
                {statusOptions.map((status) => (
                  <Button
                    key={status}
                    type="button"
                    variant="outline"
                    className={
                      currentStatus === status
                        ? "border-blue-500 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
                        : undefined
                    }
                    onClick={() => onStatusChange(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamManagement() {
  const { teamMembers, teamOps, departments, departmentOps } = useAdmin();
  const { toast } = useToast();
  const empty = { name: "", role: "", avatar: "", bio: "", category: "" };
  const emptyDept = { name: "", description: "", members: "" };
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [deptForm, setDeptForm] = useState(emptyDept);
  const [isDeptSubmitting, setIsDeptSubmitting] = useState(false);

  const openCreate = () => { setEditing(null); setFormData(empty); setIsModalOpen(true); };
  const openEdit = (item) => {
    setEditing(item);
    setFormData({ ...empty, ...item });
    setIsModalOpen(true);
  };
  const closeModal = () => { if (isSubmitting) return; setIsModalOpen(false); setEditing(null); setFormData(empty); };

  const openDeptCreate = () => { setEditingDept(null); setDeptForm(emptyDept); setIsDeptModalOpen(true); };
  const openDeptEdit = (item) => {
    setEditingDept(item);
    setDeptForm({ name: item.name || "", description: item.description || "", members: Array.isArray(item.members) ? item.members.join(", ") : item.members || "" });
    setIsDeptModalOpen(true);
  };
  const closeDeptModal = () => { if (isDeptSubmitting) return; setIsDeptModalOpen(false); setEditingDept(null); setDeptForm(emptyDept); };

  const handleChange = (key) => (e) => setFormData((p) => ({ ...p, [key]: e.target.value }));
  const handleDeptChange = (key) => (e) => setDeptForm((p) => ({ ...p, [key]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData((p) => ({ ...p, avatar: reader.result?.toString() || "" }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editing) {
        const saved = await teamOps.update(editing.id, formData);
        setSelected((p) => p?.id === editing.id ? { ...p, ...(saved || formData) } : p);
      } else {
        await teamOps.add(formData);
      }
      setIsSubmitting(false);
      closeModal();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
      setIsSubmitting(false);
    }
  };

  const handleDeptSubmit = async (e) => {
    e.preventDefault();
    setIsDeptSubmitting(true);
    try {
      const payload = {
        ...deptForm,
        members: deptForm.members.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editingDept) {
        await departmentOps.update(editingDept.id, payload);
      } else {
        await departmentOps.add(payload);
      }
      setIsDeptSubmitting(false);
      closeDeptModal();
    } catch {
      toast({ title: "Save failed", variant: "destructive" });
      setIsDeptSubmitting(false);
    }
  };

  const handleDelete = (id) => {
    teamOps.remove(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <AdminLayout>
      <SectionHeader
        title="Team Management"
        description="Manage the Meet the Experts section on the About page."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={openDeptCreate} className="gap-2">
              <Plus size={16} /> Add Department
            </Button>
            <Button onClick={openCreate} className="gap-2">
              <Plus size={16} /> Add Member
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_340px]">
        <div className="glass-card rounded-2xl p-4 md:p-5">
          <DataTable
            columns={[
              {
                key: "name",
                label: "Member",
                render: (_, row) => (
                  <div className="flex items-center gap-3">
                    {row.avatar && !row.avatar.startsWith("data:") === false || row.avatar?.startsWith("http") ? (
                      <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {row.avatar?.length <= 3 ? row.avatar : row.name?.slice(0, 2)?.toUpperCase() || "TM"}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-muted-foreground">{row.role}</p>
                    </div>
                  </div>
                ),
              },
              { key: "role", label: "Role" },
            ]}
            data={teamMembers}
            onEdit={openEdit}
            onDelete={handleDelete}
            onRowClick={setSelected}
            selectedId={selected?.id}
          />
        </div>

        <SidePanel
          title={selected ? "Details" : "No Selection"}
          description={selected ? "Full member details." : "Select a member to view details."}
          className="xl:sticky xl:top-6 xl:self-start xl:max-h-[80vh] xl:overflow-y-auto"
        >
          {selected ? (
            <div className="space-y-1">
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-border">
                {selected.avatar ? (
                  <img src={selected.avatar} alt={selected.name} className="w-14 h-14 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {selected.avatar?.length <= 3 ? selected.avatar : selected.name?.slice(0, 2)?.toUpperCase() || "TM"}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{selected.name}</p>
                  <p className="text-sm text-primary">{selected.role}</p>
                </div>
              </div>
              <DetailRow icon={UserCircle} label="Name" value={selected.name} />
              <DetailRow icon={Briefcase} label="Role" value={selected.role} />
              <DetailRow icon={FileText} label="Bio" value={selected.bio} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
          )}
        </SidePanel>
      </div>

      {/* Departments section */}
      {departments.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold mb-4">Departments</h2>
          <DataTable
            columns={[
              { key: "name", label: "Department" },
              { key: "description", label: "Description" },
              {
                key: "members",
                label: "Members",
                render: (value) => (
                  <span className="text-sm text-muted-foreground">
                    {Array.isArray(value) ? value.join(", ") : value || "—"}
                  </span>
                ),
              },
            ]}
            data={departments}
            onEdit={openDeptEdit}
            onDelete={(id) => departmentOps.remove(id)}
          />
        </div>
      )}

      {isModalOpen && (
        <FormModal
          title={editing ? "Edit Team Member" : "Add Team Member"}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={isSubmitting}
        >
          <TextField label="Name" value={formData.name} onChange={handleChange("name")} placeholder="Full name" required />
          <TextField label="Role / Designation" value={formData.role} onChange={handleChange("role")} placeholder="e.g. Web Developer" required />
          <div className="space-y-2">
            <label className="text-sm font-medium">Avatar</label>
            <div className="flex items-center gap-3">
              {formData.avatar ? (
                <img src={formData.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border border-border shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                  {formData.name?.slice(0, 2)?.toUpperCase() || "?"}
                </div>
              )}
              <div className="flex-1 space-y-2">
                <input
                  className="flex h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Initials (e.g. SG) or image URL"
                  value={formData.avatar?.startsWith("data:") ? "" : formData.avatar}
                  onChange={handleChange("avatar")}
                />
                <label className="flex items-center gap-2 cursor-pointer text-xs text-primary hover:underline">
                  <ImageIcon size={13} /> Upload image
                  <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                </label>
              </div>
            </div>
          </div>
          <TextField label="Bio" value={formData.bio} onChange={handleChange("bio")} placeholder="Short bio..." textarea required />
        </FormModal>
      )}

      {isDeptModalOpen && (
        <FormModal
          title={editingDept ? "Edit Department" : "Add Department"}
          onClose={closeDeptModal}
          onSubmit={handleDeptSubmit}
          submitting={isDeptSubmitting}
        >
          <TextField label="Department Name" value={deptForm.name} onChange={handleDeptChange("name")} placeholder="e.g. Engineering" required />
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Description</label>
              <span className={`text-xs ${deptForm.description.length > 250 ? "text-destructive" : "text-muted-foreground"}`}>
                {deptForm.description.length}/250
              </span>
            </div>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="What this department does"
              maxLength={250}
              value={deptForm.description}
              onChange={handleDeptChange("description")}
            />
            {deptForm.description.length === 0 && (
              <p className="text-xs text-muted-foreground">Max 250 characters recommended for card alignment.</p>
            )}
          </div>
          <TextField
            label="Members (comma-separated names)"
            value={deptForm.members}
            onChange={handleDeptChange("members")}
            placeholder="John Doe, Jane Smith"
            textarea
          />
        </FormModal>
      )}
    </AdminLayout>
  );
}
