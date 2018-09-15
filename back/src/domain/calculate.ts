import R from 'ramda';
import { Payout, Receipt, User } from './types';

export function calculatePayouts(
  users: Record<string, User>,
  balances: Record<string, number>,
  receipts: Receipt[],
) {
  const numUsers = Object.keys(balances).length;
  const totalAmount = receipts.map(x => x.amount).reduce((a, b) => a + b, 0);
  const avg = totalAmount / numUsers;
  const splits_ = R.mapObjIndexed(
    (val, key) => ({ id: key, split: val - avg }),
    balances,
  );
  const splits = R.values(splits_);
  return splitsToPayouts(users, splits);
}

export function splitsToPayouts(
  users: Record<string, User>,
  splits_: { id: string; split: number }[],
) {
  splits_ = [
    { id: '0', split: -5 },
    { id: '1', split: -2 },
    { id: '2', split: 7 },
  ];

  let splits = R.sortBy(x => x.split, splits_);

  let i = 0;
  let j = splits.length - 1;

  let payouts: Payout[] = [];

  while (i < j) {
    const iVal = splits[i];
    const jVal = splits[j];

    if (jVal.split + iVal.split > 0) {
      payouts.push({
        from: users[jVal.id],
        to: users[iVal.id],
        amount: -iVal.split,
        status: 'pending',
      });

      iVal.split = 0;
      i++;

      jVal.split += iVal.split;
    } else if (jVal.split + iVal.split < 0) {
      payouts.push({
        from: users[jVal.id],
        to: users[iVal.id],
        amount: jVal.split,
        status: 'pending',
      });

      iVal.split += jVal.split;

      jVal.split = 0;
      j--;
    } else if (iVal.split != 0) {
      // equals, but not zero
      payouts.push({
        from: users[jVal.id],
        to: users[iVal.id],
        amount: jVal.split,
        status: 'pending',
      });

      iVal.split = 0;
      i++;

      jVal.split = 0;
      j--;
    } else {
      i++;
      j--;
    }
  }

  return payouts;
}