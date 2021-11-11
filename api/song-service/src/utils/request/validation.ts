import * as yup from 'yup';

/**
 * Additional validation options:
 * @member sortByColumns - sortable columns
 * @member sortByAliases - override mapping params with provided values
 */
type TPaginationValidationOptions = {
  sortByColumns?: string[];
  sortByAliases?: Record<string, string>;
};

/**
 * Pagination factory function
 */
export const createPaginationValidation = ({
  sortByColumns = [],
  sortByAliases = {},
}: TPaginationValidationOptions = {}) => ({
  page: yup.number().min(1),
  pageSize: yup
    .number()
    .min(1)
    .max(100),
  sortBy: yup
    .string()
    .oneOf(sortByColumns)
    .transform((value) => sortByAliases[value] ?? value),
  direction: yup.string().oneOf(['ASC', 'DESC']),
});
