import { useRef, useState } from "react";
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

export function CourseManagement() {
  const { courses, courseOps, courseApplications, courseAppOps } = useAdmin();
  const [activeTab, setActiveTab] = useState("courses");
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Course Management
          </h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-base">
            Add courses for the public Courses page and review course applications.
          </p>
        </div>
        {activeTab === "courses" ? (
          <Button
            className="rounded-2xl px-6 py-6 text-base font-semibold"
            onClick={() => document.getElementById("course-create")?.click()}
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
            Courses
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
          <CrudPageInner
            title="Course"
            framed={false}
            addLabel="Add Course"
            createButtonId="course-create"
            hideCreateButton
            data={courses}
            operations={courseOps}
            emptyItem={{ title: "", description: "", duration: "", techStack: "" }}
            columns={[
              { key: "title", label: "Title" },
              { key: "duration", label: "Duration" },
              {
                key: "techStack",
                label: "Tech Stack",
                render: (value) => (Array.isArray(value) ? value.join(", ") : value || "Not set"),
              },
              { key: "description", label: "Description" },
            ]}
            fields={[
              { key: "title", label: "Course Title", placeholder: "Full Stack Web Development", required: true },
              { key: "description", label: "Description", placeholder: "Describe the course", type: "textarea", required: true },
              { key: "duration", label: "Duration", placeholder: "3 Months", required: true },
              { key: "techStack", label: "Tech Stack", placeholder: "React, Node.js, PostgreSQL", required: true },
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
