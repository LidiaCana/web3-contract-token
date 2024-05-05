import { useState } from 'react';
import { Contract } from '@aztec/aztec.js';
import { deployerEnv } from '../config';
import { toast } from 'react-toastify';

export function useToken({ contract }: { contract: Contract }) {
  const [wait, setWait] = useState(false);

  const setAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const el = e.currentTarget.elements.namedItem('admin') as HTMLInputElement;
    if (el) {
      setWait(true);

      const address = el.value;
      await toast.promise(contract!.methods.set_admin(BigInt(address)).send().wait(), {
        pending: 'Setting ...',
        success: `Admin set: ${address}`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  const setMinter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = (e.currentTarget.elements.namedItem('minter') as HTMLInputElement).value;
    const approve = (e.currentTarget.elements.namedItem('approve') as HTMLInputElement).value;
    if (address && approve) {
      setWait(true);

      await toast.promise(contract!.methods.set_minter(BigInt(address), approve).send().wait(), {
        pending: 'Setting ...',
        success: `Minter set: ${address}`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  const mintPublic = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const address = (e.currentTarget.elements.namedItem('minter') as HTMLInputElement).value;
    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    if (address && amount) {
      setWait(true);

      await toast.promise(contract!.methods.mint_public(BigInt(address), amount).send().wait(), {
        pending: 'Setting ...',
        success: `Process success`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  const mintPrivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    const secret = (e.currentTarget.elements.namedItem('secretHash') as HTMLInputElement).value;
    if (amount && secret) {
      setWait(true);

      await toast.promise(contract!.methods.mint_private(amount, secret).send().wait(), {
        pending: 'Setting ...',
        success: `Process Success`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  const shield = async (e: React.FormEvent<HTMLFormElement>) => {
    // from: AztecAddress, amount: Field, secret_hash: Field, nonce: Field
    e.preventDefault();

    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    const from = (e.currentTarget.elements.namedItem('from') as HTMLInputElement).value;
    const secret = (e.currentTarget.elements.namedItem('secretHash') as HTMLInputElement).value;
    const nonce = (e.currentTarget.elements.namedItem('nonce') as HTMLInputElement).value;
    if (amount && secret && from && nonce) {
      setWait(true);

      await toast.promise(contract!.methods.shield(BigInt(from), BigInt(amount), secret, nonce).send().wait(), {
        pending: 'Setting ...',
        success: `Process Success`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  const transferPublic = async (e: React.FormEvent<HTMLFormElement>) => {
    // transfer_public(from: AztecAddress, to: AztecAddress, amount: Field, nonce: Field)

    e.preventDefault();

    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    const from = (e.currentTarget.elements.namedItem('from') as HTMLInputElement).value;
    const to = (e.currentTarget.elements.namedItem('to') as HTMLInputElement).value;
    const nonce = (e.currentTarget.elements.namedItem('nonce') as HTMLInputElement).value;
    if (amount && from && to && nonce) {
      setWait(true);

      await toast.promise(
        contract!.methods.transfer_public(BigInt(from), BigInt(to), BigInt(amount), nonce).send().wait(),
        {
          pending: 'Setting ...',
          success: `Process Success`,
          error: 'Error setting admin',
        },
      );
      setWait(false);
    }
  };
  const burnPublic = async (e: React.FormEvent<HTMLFormElement>) => {
    // burn_public(from: AztecAddress, amount: Field, nonce: Field)

    e.preventDefault();

    const amount = (e.currentTarget.elements.namedItem('amount') as HTMLInputElement).value;
    const from = (e.currentTarget.elements.namedItem('from') as HTMLInputElement).value;

    const nonce = (e.currentTarget.elements.namedItem('nonce') as HTMLInputElement).value;
    if (amount && from && nonce) {
      setWait(true);

      await toast.promise(contract!.methods.burn_public(BigInt(from), BigInt(amount), nonce).send().wait(), {
        pending: 'Setting ...',
        success: `Process Success`,
        error: 'Error setting admin',
      });
      setWait(false);
    }
  };
  return { setAdmin, setMinter, mintPublic, mintPrivate, shield, transferPublic, burnPublic, wait };
}
