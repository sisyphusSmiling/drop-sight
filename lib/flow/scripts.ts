import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import GetEVMAddresses from '../../cadence/scripts/get_evm_addresses.cdc';

export const executeAddressScript = async (addresses: string[]) => {
  const cadenceAddresses = addresses.map(addr => addr.replace("0x", ""));

  try {
    const response = await fcl.query({
      cadence: GetEVMAddresses,
      args: (arg, t) => [
        fcl.arg(addresses, t.Array(t.Address))
      ],
    });

    return response;
  } catch (error) {
    console.error("Error executing Cadence script:", error);
    throw error;
  }
}; 