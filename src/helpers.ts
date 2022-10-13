function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "2-digit",
    });
}

export default formatDate;
