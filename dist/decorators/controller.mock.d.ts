export declare class ProductInput {
    id: string;
}
export declare class ProductController {
    getProduct(id: string): Promise<string>;
    createProduct(input: ProductInput): Promise<ProductInput>;
}
export declare class Game {
    id: string;
    status: string;
    setStatus(status: string): void;
}
export declare class GameController {
    updateGame(product: Game): Promise<Game>;
    publishGame(product: Game): Promise<Game>;
}
