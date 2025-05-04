import { Injectable } from '@nestjs/common';
import { ENTRY_TYPES } from 'src/constants/app.constants';

@Injectable()
export class EntriesService {
  validateEntries(
    entries: Array<{ amount: number; type: ENTRY_TYPES }>,
  ): boolean {
    let totalDebits = 0;
    let totalCredits = 0;

    for (const entry of entries) {
      if (entry.type === ENTRY_TYPES.DEBIT) {
        totalDebits += entry.amount;
      } else if (entry.type === ENTRY_TYPES.CREDIT) {
        totalCredits += entry.amount;
      }
    }

    return totalDebits === totalCredits;
  }
}
