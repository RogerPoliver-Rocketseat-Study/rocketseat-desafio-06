import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  // private categoriesRepository:
  // constructor() {
  // }

  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new AppError('Insufficient balance for this transaction', 400);
    }

    let findCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!findCategory) {
      findCategory = categoriesRepository.create({ title: category });

      await categoriesRepository.save(findCategory);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category: findCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
