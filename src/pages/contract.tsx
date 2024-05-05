import { useState } from 'react';
import { Contract } from '@aztec/aztec.js';
import { filteredInterface } from '../config';
import { useToken } from '../hooks/useToken';

export function ContractComponent({ contract }: { contract: Contract }) {
  const { wait, setAdmin, setMinter, mintPublic, mintPrivate, shield, transferPublic, burnPublic } = useToken({
    contract,
  });

  return (
    <div>
      <h1>Your Contract</h1>

      <label htmlFor="functions">Functions:</label>
      <select name="functions" id="functions" onChange={() => console.log('')}>
        {filteredInterface.map(
          (fn, index) =>
            fn.functionType !== 'unconstrained' && (
              <option key={index} value={index}>
                {fn.name}
              </option>
            ),
        )}
      </select>
      <br />
      <h1>Set Admin</h1>
      <form onSubmit={setAdmin}>
        <label>Admin Address</label>
        <input type="text" name="admin" id="admin" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Set Minter</h1>
      <form onSubmit={setMinter}>
        <label>Admin Address</label>
        <input type="text" name="minter" id="minter" />
        <label>Approve</label>
        <input type="checkbox" name="approve" id="approve" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Mint Public</h1>
      <form onSubmit={mintPublic}>
        <label>Admin Address</label>
        <input type="text" name="to" id="to" />
        <label>Approve</label>
        <input type="number" name="amount" id="amount" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Mint Private</h1>
      <form onSubmit={mintPrivate}>
        <label>Amount</label>
        <input type="number" name="amount" id="amount" />
        <label>secret hash</label>
        <input type="text" name="text" id="text" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Shield</h1>
      <form onSubmit={shield}>
        {/* from: AztecAddress, amount: Field, secret_hash: Field, nonce: Field */}
        <label>Address from</label>
        <input type="text" name="from" id="from" />
        <label>Amount</label>
        <input type="number" name="amount" id="amount" />
        <label>Secret</label>
        <input type="text" name="secretHash" id="secretHash" />
        <label>Nonce</label>
        <input type="text" name="nonce" id="nonce" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Transfer Public</h1>
      <form onSubmit={transferPublic}>
        {/* from: AztecAddress, amount: Field, secret_hash: Field, nonce: Field */}
        <label>Address from</label>
        <input type="text" name="from" id="from" />
        <label>Amount</label>
        <input type="number" name="amount" id="amount" />
        <label>To Address</label>
        <input type="text" name="to" id="to" />
        <label>Nonce</label>
        <input type="text" name="nonce" id="nonce" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
      <h1>Burn Public</h1>
      <form onSubmit={burnPublic}>
        {/* from: AztecAddress, amount: Field, secret_hash: Field, nonce: Field */}
        <label>Address from</label>
        <input type="text" name="from" id="from" />
        <label>Amount</label>
        <input type="number" name="amount" id="amount" />
        <label>Nonce</label>
        <input type="text" name="nonce" id="nonce" />
        <button type="submit" disabled={wait}>
          Set
        </button>
      </form>
      <br />
    </div>
  );
}
