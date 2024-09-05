const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", (accounts) => {
    let simpleStorageInstance;

    beforeEach(async () => {
        simpleStorageInstance = await SimpleStorage.new();
    });

    it("should store the value 42", async () => {
        // Call the store function
        await simpleStorageInstance.store(42, { from: accounts[0] });

        // Retrieve the stored value
        const storedData = await simpleStorageInstance.retrieve();

        // Check if the stored value is 42
        assert.equal(storedData, 42, "The value 42 was not stored.");
    });

    it("should emit DataStored event when storing a value", async () => {
        // Call the store function and get the transaction receipt
        const receipt = await simpleStorageInstance.store(42, {
            from: accounts[0],
        });

        // Check that the DataStored event was emitted
        assert.equal(receipt.logs.length, 1, "An event was not emitted");
        assert.equal(
            receipt.logs[0].event,
            "DataStored",
            "Event emitted is not DataStored",
        );
        assert.equal(
            receipt.logs[0].args.data,
            42,
            "Event did not log the correct data",
        );
    });

    it("should retrieve the correct value after storing", async () => {
        // Store a value
        await simpleStorageInstance.store(100, { from: accounts[0] });

        // Retrieve the stored value
        const storedData = await simpleStorageInstance.retrieve();

        // Check if the stored value is 100
        assert.equal(storedData, 100, "The value retrieved is not 100.");
    });

    it("should return zero when no value is stored initially", async () => {
        // Retrieve the value without storing anything first
        const storedData = await simpleStorageInstance.retrieve();

        // Check if the stored value is zero
        assert.equal(storedData, 0, "The initial value should be zero.");
    });
});
