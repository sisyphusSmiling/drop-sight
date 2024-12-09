import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import GetEVMAddresses from '../../cadence/scripts/get_evm_addresses.cdc';
import GetEVMAddress from '../../cadence/scripts/get_evm_address.cdc';

export const executeSingleAddressScript = async (address: string) => {
  const cadenceAddress = address.replace("0x", "");

  try {
    const response = await fcl.query({
      cadence: GetEVMAddress,
      args: () => [
        fcl.arg(`0x${cadenceAddress}`, t.Address)
      ],
    });

    return response;
  } catch (error) {
    console.error("Error executing Cadence script:", error);
    throw error;
  }
};

export const executeAddressScript = async (addresses: string[]) => {
  const cadenceAddresses = addresses.map(addr => addr.replace("0x", ""));

  try {
    const response = await fcl.query({
      cadence: GetEVMAddresses,
      args: () => [
        fcl.arg(cadenceAddresses.map(addr => `0x${addr}`), t.Array(t.Address))
      ],
    });

    return response;
  } catch (error) {
    console.error("Error executing Cadence script:", error);
    throw error;
  }
}; 