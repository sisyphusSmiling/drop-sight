import EVM from 0x8c5303eaa26202d6

access(all)
view fun getCOAAddress(from address: Address): String? {
    return getAuthAccount<auth(BorrowValue) &Account>(address)
        .storage.borrow<&EVM.CadenceOwnedAccount>(from: /storage/evm)
        ?.address()
        ?.toString()
        ?? nil
}

access(all)
fun main(addresses: [Address]): {Address: String} {
    let results: {Address: String} = {}

    for address in addresses {
        let evmAddress = getCOAAddress(from: address)
        log(evmAddress)
        // Replace with your actual Cadence script logic
        results[address] = evmAddress != nil ? "0x".concat(evmAddress!) : "N/A"
    }
    
    return results
}