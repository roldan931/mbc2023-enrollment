import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
actor Verifier {
    public type StudentProfile = {
        name : Text;
        Team : Text;
        graduate : Bool;
    };
    let studentProfileStore = HashMap.HashMap<Principal, StudentProfile>(1, Principal.equal, Principal.hash);

    public shared ({ caller }) func addMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
        studentProfileStore.put(caller, profile);
        #ok();
    };

    public query func seeAProfile(p : Principal) : async ?StudentProfile {
        return studentProfileStore.get(p);
    };

    public shared ({ caller }) func updateMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
        let student = studentProfileStore.get(caller);
        switch (student) {
            case (?value) {
                studentProfileStore.put(caller, profile);
                #ok();
            };
            case (null) {
                #err("Student not found");
            };
        };
    };

    public shared ({ caller }) func deleteMyProfile(profile : StudentProfile) : async Result.Result<(), Text> {
        let student = studentProfileStore.get(caller);
        switch (student) {
            case (?value) {
                studentProfileStore.delete(caller);
                #ok();
            };
            case (null) {
                #err("Student not found");
            };
        };
    };

    //Parte 2
    public type TestResult = Result.Result<(), TestError>;
    public type TestError = {
        #UnexpectedValue : Text;
        #UnexpectedError : Text;
    };

    public shared func test(canisterId : Principal) : async TestResult {
        switch (canisterId) {
            case (?value) {
                #ok();
            };
            case (_) {
                UnexpectedError "1";
            };
            case (null) {
                #UnexpectedValue "2";
            };
        };
    };

    //Parte 3
    public shared func verifyOwnership(canisterId : Principal, principalId : Principal) : async Bool {
        let canister = await ManagementCanister.canister_status(canisterId);
        let principal = Array.find(canister.settings.controllers, func x = Principal.equal(x, principalId));
        switch (principal) {
            case (?value) {
                return true;
            };
            case (null) {
                return false;
            };
        };
    };

    //Parte 4
    public shared func verifyWork(canisterId : Principal, principalId : Principal) : async Result.Result<(), Text> {
        let verify = await verifyOwnership(canisterId, principalId);
        if (verify) {
            let student = studentProfileStore.get(canisterId);
            switch (student) {
                case (?value) {
                    let s : StudentProfile = {
                        name = value.name;
                        Team = value.Team;
                        graduate = true;
                    };
                    studentProfileStore.put(canisterId, s);
                    #ok();
                };
                case (null) {
                    #err("Student not found");
                };
            };
        } else {
            #err("Student not found");
        };
    };
};
