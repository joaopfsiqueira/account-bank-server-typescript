export class FormatTransaction {
  public async insert(transactionsUser: Object[]): Promise<Object[]> {
    let allTransactions: Object[] = [];
    for (var i = 0; i < transactionsUser.length; i++) {
      const formatedTransaction = await this.format(transactionsUser[i]);
      allTransactions.push(formatedTransaction);
    }
    return allTransactions;
  }

  public async format(transactionsUser: any): Promise<Object> {
    return {
      value: transactionsUser.value,
      debitedAccount: transactionsUser.debitedAccount.id,
      creditedAccount: transactionsUser.creditedAccount.id,
      id: transactionsUser.id,
      createdAt: transactionsUser.createdAt,
    };
  }
}
