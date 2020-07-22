import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError(`There is no transaction with the ID: ${id}`);
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
