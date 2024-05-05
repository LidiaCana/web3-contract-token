import { useState } from 'react';
import { deployerEnv } from '../config';

import { Contract, Fr } from '@aztec/aztec.js';
import { TokenContract } from '../../artifacts/Token';
import { toast } from 'react-toastify';

export function useContract() {
  const [wait, setWait] = useState(false);
  const [contract, setContract] = useState<Contract | undefined>();

  const deploy = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setWait(true);
    const wallet = await deployerEnv.getWallet();
    const salt = Fr.random();
    // Admin, name, simbol, decimal
    const tx = await TokenContract.deploy(wallet, wallet.getCompleteAddress().address, 'Test', 'AZ', 18n).send({
      contractAddressSalt: salt,
    });
    console.log({ tx });
    const contract = await toast.promise(tx.deployed(), {
      pending: 'Deploying contract...',
      success: {
        render: ({ data }) => `Address: ${data.address}`,
      },
      error: 'Error deploying contract',
    });
    console.log({ contract });
    setContract(contract);
    setWait(false);
  };

  return { deploy, contract, wait };
}
