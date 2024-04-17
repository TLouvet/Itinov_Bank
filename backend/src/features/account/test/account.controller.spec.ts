import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { AccountInMemoryRepository } from '../repository/account.inmemory.repository';
import { AccountDto } from '../account.dto';
import { AuthenticationManager } from '../../../common/security/AuthenticationManager';
import { accountsMock } from './mock';

describe('AccountController Unit Test', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        {
          provide: 'IAccountRepository',
          useFactory: () => new AccountInMemoryRepository(accountsMock),
        },
        {
          provide: 'TransactionRepository',
          useValue: {
            findByAccount: () => [] as any[],
            getShortHistory: () => [] as any[],
          },
        },
        {
          provide: AuthenticationManager,
          useValue: {
            getUserID: () => 1,
          },
        },
      ],
    }).compile();

    accountController = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  describe('findAll', () => {
    it('En tant que client, je veux pouvoir accéder à la liste de mes comptes', async () => {
      expect(await accountController.findAll()).toStrictEqual({
        data: accountsMock.filter((a) => a.customer.customer_id === 1).map((a) => new AccountDto(a)),
        message: undefined,
      });
    });
  });

  describe('findOne', () => {
    it(`En tant que client, je veux pouvoir consulter l'historique des
    opérations effectuées sur mes comptes (date, montant, type, par qui,
    solde…)`, async () => {
      expect(await accountController.findOne(1)).toStrictEqual({
        data: new AccountDto(accountsMock[0]),
        message: undefined,
      });
    });
  });
});
