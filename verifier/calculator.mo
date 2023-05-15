module {
    public type CalculatorCanister = actor {
        add : shared (x : Nat) -> async Int;
        sub : shared (x : Nat) -> async Int;
        reset : shared () -> async Int;
    };
};
