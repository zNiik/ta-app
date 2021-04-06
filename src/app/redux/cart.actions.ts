export class GetCart {
    static readonly type = '[Cart] Get';
}

export class SetCartLoading {
    static readonly type = '[Cart] Set Loading';
    constructor(public payload: boolean) {}
}

export class UpdateProductQuantity {
    static readonly type = '[Cart] Update Product Quantity';
    constructor(public id: number, public quantity: number) {}
}

export class SetProductLoading {
    static readonly type = '[Cart] Set Product Loading';
    constructor(public id: number, public payload: boolean) {}
}

export class DeleteProducts {
    static readonly type = '[Cart] Delete Products';
    constructor(public ids: number[]) {}
}