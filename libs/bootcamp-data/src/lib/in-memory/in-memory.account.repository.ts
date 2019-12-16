import { IRepository, Account } from '@btcp/bootcamp-entities';

const store: Map<string, Account> = new Map();

export class InMemoryAccountRepository implements IRepository<string, Account> {
  getByQuery(query: object) {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  constructor() {
    let account  = new Account();
    account.id = '1';
    account.firstName = 'a';
    account.lastName = 'b';
    account.pw = 'account_password';
    account.pwSalt = 'account_salt';
    account.roles = ['user'];
    account.verification = 'verification_code';
    account.verified = false;
    account.verificationExpires = new Date();
    store.set(account.id, account);
  }
  async create(entity: Partial<Account>): Promise<Account> {
    return await entity as Account;
  }
  public async getAll(): Promise<Account[]> {
    return Array.from(store.values());
  }
  public async save(entity: Account): Promise<Account> {
    if (entity.id) {
      entity.id = `${store.size}`;
    }

    store[entity.id] = entity;

    return entity;
  }
  public async get(id: string): Promise<Account> {
    return store[id];
  }

}