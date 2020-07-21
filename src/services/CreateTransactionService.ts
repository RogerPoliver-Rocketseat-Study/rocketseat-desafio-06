// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor() {
    // this.categoriesRepository = getCustomRepository(CategoriesRepository);
    this.transactionsRepository = getCustomRepository(TransactionsRepository);
  }

  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    await this.transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
