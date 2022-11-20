export async function format(createdTransaction: any): Promise<Object> {
  return {
    Message: 'Transferência realizada com sucesso!',
    id: createdTransaction.id,
    createdAt: createdTransaction.createdAt,
  };
}
