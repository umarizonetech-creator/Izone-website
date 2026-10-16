export const slugify = (text = '') => {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getCourseSlug = (course) => {
  if (!course) return '';
  if (course.slug && String(course.slug).trim()) {
    return slugify(course.slug);
  }
  if (course.title && String(course.title).trim()) {
    return slugify(course.title);
  }
  return String(course.id || '');
};

export const getCourseUrl = (course) => {
  const slug = getCourseSlug(course);
  return `/courses/${slug}`;
};
