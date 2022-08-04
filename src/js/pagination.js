import Pagination from 'tui-pagination';
export default function getPagination(totalFilms, perPage, pagination) {
    const options = {
        totalItems: totalFilms,
        itemsPerPage: perPage,
        visiblePages: 5,
        centerAlign: true,
    };
    return new Pagination(pagination, options);
}
