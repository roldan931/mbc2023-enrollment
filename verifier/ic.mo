module {
    public type CanisterId = Principal;

    public type ManagementCanister = actor {
        canister_status : ({ canister_id : CanisterId }) -> async ({
            controllers : [Principal]
        });
    };
};
