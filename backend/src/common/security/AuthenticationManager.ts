import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

/**
 * En supposant une utilisation d'un Guard JWT, le user serait injecté à la réception de la requête.
 * Il deviendrait alors possible d'accéder à l'objet depuis cette classe
 */
@Injectable()
export class AuthenticationManager {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { user?: { id?: number } },
  ) {}

  async getUserID() {
    return this.request.user?.id ?? 1;
  }
}
