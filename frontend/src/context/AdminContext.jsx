import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext(null);

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
const LOCAL_TESTIMONIALS_KEY = "admin_local_testimonials";


const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString();
};

const splitList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
};

const parseList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : splitList(value);
  } catch {
    return splitList(value);
  }
};

const withMeta = (item) => ({
  ...item,
  date: item.date || formatDate(item.createdAt || item.created_at),
  createdAt: item.createdAt || item.created_at ? new Date(item.createdAt || item.created_at).getTime() : Date.now(),
});

const mapPopupFromApi = (item) => ({
  ...withMeta(item),
  message: item.description || item.message || "",
  isActive: item.isActive ?? item.is_active ?? false,
  status: item.isActive || item.is_active ? "Active" : "Inactive",
  image: item.image || "",
});

const mapPopupToApi = (item) => ({
  title: item.title,
  description: item.message || item.description || "",
  isActive: item.status ? item.status === "Active" : item.isActive === true,
  image: item.image || "",
});

const mapTestimonialFromApi = (item) => ({
  ...withMeta(item),
  quote: item.description || item.quote || "",
  author: item.name || item.author || "",
  position: item.designation || item.position || "",
  role: item.designation || item.role || "",
  avatar: item.image || item.avatar || "",
  rating: String(item.rating || "5"),
});

const mapTestimonialToApi = (item) => ({
  name: item.author || item.name || "",
  designation: item.position || item.role || item.designation || "",
  description: item.quote || item.description || "",
  rating: Number(item.rating || 5),
  image: item.avatar || item.image || "",
});

const mapClientFromApi = (item) => ({
  ...withMeta(item),
  companyName: item.companyName || item.company_name || item.name || "",
  name: item.companyName || item.company_name || item.name || "",
  logo: item.icon || item.logo || "",
});

const mapClientToApi = (item) => ({
  companyName: item.name || item.companyName || "",
  industry: item.industry || "",
  description: item.description || "",
  icon: item.logo || item.icon || "",
});

const mapProjectFromApi = (item) => ({
  ...withMeta(item),
  selectedServices: parseList(item.selectedServices || item.selected_services),
  services: item.services || parseList(item.selectedServices || item.selected_services).join(", "),
  subServices: item.subServices || item.timeline || "",
  projectDetails: item.projectDetails || item.project_details || "",
  isRead: item.isRead ?? item.is_read ?? false,
});

const mapProjectToApi = (item) => ({
  name: item.name || "",
  email: item.email || "",
  phone: item.phone || "",
  company: item.company || "",
  selectedServices: item.selectedServices || splitList(item.services),
  budget: item.budget || "",
  timeline: item.timeline || item.subServices || "",
  projectDetails: item.projectDetails || "",
  status: item.status,
  isRead: item.isRead,
});

const mapJobRoleFromApi = (item) => ({
  ...withMeta(item),
  roleName: item.roleName || item.role_name || "",
  workCulture: item.workCulture || item.work_culture || "",
  workTiming: item.workTiming || item.work_timing || "",
  isActive: item.isActive ?? item.is_active ?? true,
});

const mapInternRoleFromApi = (item) => ({
  ...withMeta(item),
  roleName: item.roleName || item.role_name || "",
  description: item.description || "",
  duration: item.duration || "3 Months",
});

const mapContactFromApi = (item) => ({
  ...withMeta(item),
  isRead: item.isRead ?? item.is_read ?? false,
});

const mapJobApplicationFromApi = (item) => ({
  ...withMeta(item),
  resumeName: item.resumeName || item.resume_name || "",
  resumeType: item.resumeType || item.resume_type || "",
  jobRole: item.jobRole || item.job_role || "",
  isRead: item.isRead ?? item.is_read ?? false,
});

const mapInternApplicationFromApi = (item) => ({
  ...withMeta(item),
  resumeName: item.resumeName || item.resume_name || "",
  resumeType: item.resumeType || item.resume_type || "",
  isRead: item.isRead ?? item.is_read ?? false,
});

const mapSitePhotoFromApi = (item) => ({
  ...withMeta(item),
  alt: item.alt || item.name || "",
});

const mapTeamMemberFromApi = (item) => ({
  ...withMeta(item),
});

const mapTeamMemberToApi = (item) => ({
  name: item.name || "",
  role: item.role || "",
  avatar: item.avatar || "",
  bio: item.bio || "",
  category: item.category || "",
});

const mapPortfolioFromApi = (item) => ({
  ...withMeta(item),
  client: item.client || item.clientName || item.client_name || "",
  clientName: item.clientName || item.client_name || item.client || "",
  tags: parseList(item.tags).slice(0, 4),
  link: item.link || "",
});

const mapPortfolioToApi = (item) => ({
  title: item.title || "",
  category: item.category || "",
  description: item.description || "",
  image: item.image || "",
  tags: parseList(item.tags).slice(0, 4),
  clientName: item.client || item.clientName || "",
  link: item.link || "",
});

const mapDepartmentFromApi = (item) => ({
  ...withMeta(item),
  members: parseList(item.members),
});

const mapDepartmentToApi = (item) => ({
  name: item.name || "",
  description: item.description || "",
  members: Array.isArray(item.members) ? item.members : parseList(item.members),
});

const endpointConfig = {
  popups: { path: "/api/popups", fromApi: mapPopupFromApi, toApi: mapPopupToApi, method: "PUT" },
  testimonials: { path: "/api/testimonials", fromApi: mapTestimonialFromApi, toApi: mapTestimonialToApi, method: "PUT" },
  jobRoles: { path: "/api/job-roles", fromApi: mapJobRoleFromApi, toApi: (item) => ({ ...item, isActive: item.isActive ?? true }), method: "PUT" },
  contacts: { path: "/api/contacts", fromApi: mapContactFromApi, toApi: (item) => item },
  clients: { path: "/api/clients", fromApi: mapClientFromApi, toApi: mapClientToApi, method: "PUT" },
  internApplications: { path: "/api/intern-applications", fromApi: mapInternApplicationFromApi, toApi: (item) => item },
  jobApplications: { path: "/api/job-applications", fromApi: mapJobApplicationFromApi, toApi: (item) => item },
  internRoles: {
    path: "/api/intern-roles",
    fromApi: mapInternRoleFromApi,
    toApi: (item) => ({
      roleName: item.roleName,
      description: item.description || "",
      duration: item.duration || "3 Months",
    }),
    method: "PUT",
  },
  sitePhotos: { path: "/api/site-photos", fromApi: mapSitePhotoFromApi, toApi: (item) => ({ ...item, alt: item.alt || item.name || "" }) },
  serviceRequests: { path: "/api/project-inquiries", fromApi: mapProjectFromApi, toApi: mapProjectToApi },
  team: { path: "/api/team", fromApi: mapTeamMemberFromApi, toApi: mapTeamMemberToApi, method: "PUT" },
  portfolios: { path: "/api/portfolios", fromApi: mapPortfolioFromApi, toApi: mapPortfolioToApi, method: "PUT" },
  courses: {
    path: "/api/courses",
    fromApi: (item) => ({ ...withMeta(item), techStack: parseList(item.techStack || item.tech_stack) }),
    toApi: (item) => ({ title: item.title || "", description: item.description || "", duration: item.duration || "", techStack: Array.isArray(item.techStack) ? item.techStack : parseList(item.techStack) }),
    method: "PUT",
  },
  courseApplications: {
    path: "/api/course-applications",
    fromApi: (item) => ({ ...withMeta(item), courseTitle: item.courseTitle || item.course_title || "", isRead: item.isRead ?? item.is_read ?? false }),
    toApi: (item) => item,
  },
  departments: {
    path: "/api/departments",
    fromApi: mapDepartmentFromApi,
    toApi: mapDepartmentToApi,
    method: "PUT",
  },
};

const normalizeId = (id) => String(id);

const replaceById = (items, next) =>
  items.map((item) => (normalizeId(item.id) === normalizeId(next.id) ? next : item));

const mergeById = (...lists) => {
  const seen = new Set();
  return lists.flat().filter((item) => {
    const id = normalizeId(item.id);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

const makeCrud = (setter) => ({
  add: (item) => setter((previous) => [...previous, { ...item, id: Date.now().toString() }]),
  update: (id, item) =>
    setter((previous) =>
      previous.map((existing) => (normalizeId(existing.id) === normalizeId(id) ? { ...existing, ...item } : existing))
    ),
  remove: (id) => setter((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id))),
});

export const AdminProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => load("admin_token", ""));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => Boolean(load("admin_token", "")));
  const [popups, setPopups] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [localTestimonials, setLocalTestimonials] = useState(() => load(LOCAL_TESTIMONIALS_KEY, []));
  const [jobRoles, setJobRoles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [interns, setInterns] = useState(() => load("admin_interns", []));
  const [clients, setClients] = useState([]);
  const [internApplications, setInternApplications] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [internRoles, setInternRoles] = useState([]);
  const [sitePhotos, setSitePhotos] = useState([]);
  const [readIds, setReadIds] = useState(() => load("admin_read_ids", []));
  const [serviceRequests, setServiceRequests] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseApplications, setCourseApplications] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [publicDataLoaded, setPublicDataLoaded] = useState(false);

  useEffect(() => { persist("admin_interns", interns); }, [interns]);
  useEffect(() => { persist("admin_read_ids", readIds); }, [readIds]);
  useEffect(() => { persist(LOCAL_TESTIMONIALS_KEY, localTestimonials); }, [localTestimonials]);

  const apiRequest = async (path, options = {}) => {
    const token = options.tokenOverride ?? authToken;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
    if (!response.ok) {
      const text = await response.text();
      if (response.status === 401 || response.status === 403) {
        persist("admin_token", "");
        setAuthToken("");
        setIsAdminLoggedIn(false);
      }
      throw new Error(text || `Request failed: ${response.status}`);
    }
    if (response.status === 204) return null;
    return response.json();
  };

  const loadList = async (key, setter, tokenOverride = authToken) => {
    const config = endpointConfig[key];
    const data = await apiRequest(config.path, { tokenOverride });
    const mapped = Array.isArray(data) ? data.map(config.fromApi) : [];
    setter(mapped);
  };

  const loadTestimonials = async (tokenOverride = "") => {
    const config = endpointConfig.testimonials;
    const data = await apiRequest(config.path, { tokenOverride });
    const mapped = Array.isArray(data) ? data.map(config.fromApi) : [];
    setTestimonials(mergeById(localTestimonials, mapped));
  };

  const refreshAdminData = async (tokenOverride = authToken) => {
    await Promise.all([
      loadList("contacts", setContacts, tokenOverride),
      loadList("jobApplications", setJobApplications, tokenOverride),
      loadList("internApplications", setInternApplications, tokenOverride),
      loadList("serviceRequests", setServiceRequests, tokenOverride),
      loadList("courseApplications", setCourseApplications, tokenOverride).catch(() => {}),
      // These resources power dedicated Admin Dashboard sections (Team, Departments,
      // Clients, Portfolio, Job Roles, Intern Roles, Photos, Courses, Testimonials).
      // They were previously only fetched via ensureLoaded() from public-facing pages,
      // so on a fresh admin session/page refresh these sections appeared empty even
      // though the records exist in the database and render correctly on the public site.
      loadList("team", setTeamMembers, tokenOverride).catch((error) => console.error("Failed to load team members", error)),
      loadList("departments", setDepartments, tokenOverride).catch((error) => console.error("Failed to load departments", error)),
      loadList("clients", setClients, tokenOverride).catch((error) => console.error("Failed to load clients", error)),
      loadList("portfolios", setPortfolios, tokenOverride).catch((error) => console.error("Failed to load portfolios", error)),
      loadList("jobRoles", setJobRoles, tokenOverride).catch((error) => console.error("Failed to load job roles", error)),
      loadList("internRoles", setInternRoles, tokenOverride).catch((error) => console.error("Failed to load intern roles", error)),
      loadList("sitePhotos", setSitePhotos, tokenOverride).catch((error) => console.error("Failed to load site photos", error)),
      loadList("courses", setCourses, tokenOverride).catch((error) => console.error("Failed to load courses", error)),
      loadTestimonials(tokenOverride).catch((error) => console.error("Failed to load testimonials", error)),
    ]);
    // Mark these as loaded so ensureLoaded() (called from public pages) doesn't
    // trigger a redundant duplicate fetch once the admin data is already in state.
    setLoadedKeys((prev) => ({
      ...prev,
      team: true,
      departments: true,
      clients: true,
      portfolios: true,
      jobRoles: true,
      internRoles: true,
      sitePhotos: true,
      courses: true,
      testimonials: true,
    }));
  };

  const [loadedKeys, setLoadedKeys] = useState({ popups: true });

  const ensureLoaded = async (key) => {
    if (loadedKeys[key]) return;
    setLoadedKeys(prev => ({ ...prev, [key]: true }));
    try {
      if (key === "testimonials") {
        await loadTestimonials("");
      } else {
        const setter = {
          popups: setPopups,
          jobRoles: setJobRoles,
          clients: setClients,
          internRoles: setInternRoles,
          sitePhotos: setSitePhotos,
          team: setTeamMembers,
          portfolios: setPortfolios,
          courses: setCourses,
          departments: setDepartments,
        }[key];
        if (setter) {
          await loadList(key, setter, "");
        }
      }
    } catch (err) {
      console.error(`Failed to load public data for ${key}:`, err);
      setLoadedKeys(prev => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    // Only load popups on initial mount to avoid loading latency on site entry
    loadList("popups", setPopups, "")
      .catch((error) => console.error("Failed to load popups on mount", error))
      .finally(() => setPublicDataLoaded(true));
  }, []);

  useEffect(() => {
    if (!authToken) return;
    refreshAdminData(authToken).catch((error) => console.error("Failed to load admin data", error));
  }, [authToken]);

  const adminLogin = async (username, password) => {
    try {
      const result = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        tokenOverride: "",
      });
      persist("admin_token", result.access_token);
      setAuthToken(result.access_token);
      setIsAdminLoggedIn(true);
      await refreshAdminData(result.access_token);
      return true;
    } catch (error) {
      console.error("Admin login failed", error);
      return false;
    }
  };

  const adminLogout = () => {
    persist("admin_token", "");
    setAuthToken("");
    setIsAdminLoggedIn(false);
  };

  const makeApiCrud = (key, setter, getState) => {
    const config = endpointConfig[key];
    return {
      add: async (item) => {
        const saved = await apiRequest(config.path, {
          method: "POST",
          body: JSON.stringify(config.toApi(item)),
        });
        const mapped = config.fromApi(saved);
        setter((previous) =>
          key === "popups" && mapped.isActive
            ? [mapped, ...previous.map((existing) => ({ ...existing, isActive: false, status: "Inactive" }))]
            : [mapped, ...previous]
        );
        return mapped;
      },
      update: async (id, partialItem) => {
        const existing = getState ? getState().find((i) => normalizeId(i.id) === normalizeId(id)) : null;
        const merged = existing ? { ...existing, ...partialItem } : partialItem;
        const saved = await apiRequest(`${config.path}/${id}`, {
          method: config.method || "PATCH",
          body: JSON.stringify(config.toApi(merged)),
        });
        const mapped = config.fromApi(saved);
        setter((previous) =>
          key === "popups" && mapped.isActive
            ? previous.map((existing) =>
                normalizeId(existing.id) === normalizeId(mapped.id)
                  ? mapped
                  : { ...existing, isActive: false, status: "Inactive" }
              )
            : replaceById(previous, mapped)
        );
        return mapped;
      },
      remove: async (id) => {
        await apiRequest(`${config.path}/${id}`, { method: "DELETE" });
        setter((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
      },
    };
  };

  const testimonialOps = {
    add: async (item) => {
      const saved = await apiRequest(endpointConfig.testimonials.path, {
        method: "POST",
        body: JSON.stringify(endpointConfig.testimonials.toApi(item)),
      });
      const mapped = endpointConfig.testimonials.fromApi(saved);
      setTestimonials((previous) => [mapped, ...previous]);
      return mapped;
    },
    update: async (id, item) => {
      const isLocal = normalizeId(id).startsWith("local-testimonial-");
      if (!isLocal) {
        const saved = await apiRequest(`${endpointConfig.testimonials.path}/${id}`, {
          method: endpointConfig.testimonials.method || "PATCH",
          body: JSON.stringify(endpointConfig.testimonials.toApi(item)),
        });
        const mapped = endpointConfig.testimonials.fromApi(saved);
        setTestimonials((previous) => replaceById(previous, mapped));
        return mapped;
      }

      const saved = await apiRequest(endpointConfig.testimonials.path, {
        method: "POST",
        body: JSON.stringify(endpointConfig.testimonials.toApi(item)),
      });
      const mapped = endpointConfig.testimonials.fromApi(saved);
      setLocalTestimonials((previous) => previous.filter((existing) => normalizeId(existing.id) !== normalizeId(id)));
      setTestimonials((previous) => [mapped, ...previous.filter((existing) => normalizeId(existing.id) !== normalizeId(id))]);
      return mapped;
    },
    remove: async (id) => {
      const isLocal = normalizeId(id).startsWith("local-testimonial-");
      if (!isLocal) {
        await apiRequest(`${endpointConfig.testimonials.path}/${id}`, { method: "DELETE" });
      }
      setLocalTestimonials((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
      setTestimonials((previous) => previous.filter((item) => normalizeId(item.id) !== normalizeId(id)));
    },
  };

  const addPublicItem = (key, setter) => async (item) => {
    const config = endpointConfig[key];
    const saved = await apiRequest(config.path, {
      method: "POST",
      body: JSON.stringify(config.toApi(item)),
      tokenOverride: "",
    });
    const mapped = config.fromApi(saved);
    setter((previous) => [mapped, ...previous]);
    return mapped;
  };

  const refreshSitePhotos = async () => {
    await loadList("sitePhotos", setSitePhotos, "");
  };

  const markRead = (id) => setReadIds((p) => p.includes(id) ? p : [...p, id]);

  return (
    <AdminContext.Provider
      value={{
        publicDataLoaded,
        isAdminLoggedIn, adminLogin, adminLogout,
        popups, popupOps: makeApiCrud("popups", setPopups, () => popups),
        testimonials, testimonialOps,
        jobRoles, jobRoleOps: makeApiCrud("jobRoles", setJobRoles, () => jobRoles),
        contacts, contactOps: makeApiCrud("contacts", setContacts), addContact: addPublicItem("contacts", setContacts),
        interns, internOps: makeCrud(setInterns),
        clients, clientOps: makeApiCrud("clients", setClients, () => clients),
        internApplications, internAppOps: makeApiCrud("internApplications", setInternApplications), addInternApplication: addPublicItem("internApplications", setInternApplications),
        jobApplications, jobAppOps: makeApiCrud("jobApplications", setJobApplications), addJobApplication: addPublicItem("jobApplications", setJobApplications),
        teamMembers, teamOps: makeApiCrud("team", setTeamMembers, () => teamMembers),
        portfolios, portfolioOps: makeApiCrud("portfolios", setPortfolios, () => portfolios),
        internRoles, internRoleOps: makeApiCrud("internRoles", setInternRoles, () => internRoles),
        sitePhotos, sitePhotoOps: makeApiCrud("sitePhotos", setSitePhotos), refreshSitePhotos,
        serviceRequests, serviceRequestOps: makeApiCrud("serviceRequests", setServiceRequests, () => serviceRequests), addServiceRequest: addPublicItem("serviceRequests", setServiceRequests),
        courses, courseOps: makeApiCrud("courses", setCourses, () => courses),
        courseApplications, courseAppOps: makeApiCrud("courseApplications", setCourseApplications), addCourseApplication: addPublicItem("courseApplications", setCourseApplications),
        departments, departmentOps: makeApiCrud("departments", setDepartments, () => departments),
        readIds, markRead,
        ensureLoaded,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);