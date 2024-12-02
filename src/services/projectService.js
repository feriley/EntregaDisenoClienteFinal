export async function getPaginatedProjects(page, size) {
    const response = await fetch(`/api/v1/projects?page=${page}&size=${size}`);
    if (!response.ok) {
        throw new Error("Error fetching paginated projects");
    }
    return response.json();
}
