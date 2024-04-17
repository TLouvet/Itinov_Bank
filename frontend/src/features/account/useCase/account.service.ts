import { ApiResponse, http } from '@/config/http';
import { Account } from '../account.type';

const apiEndpoint = 'accounts';

export function findAll() {
  return http.get<ApiResponse<Account[]>>(apiEndpoint);
}

export function findOne(id: number | null) {
  return http.get<ApiResponse<Account>>(`${apiEndpoint}/${id}`);
}
