import { map } from "nanostores";

export type CartItem = {
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
    quantity: number;
};
export type RawItem = Omit<CartItem, "quantity">;

export const cartItems = map<Record<string, CartItem>>({});

export function incrementItemQuantity(item: RawItem) {
    const existingEntry = cartItems.get()[item.name];

    if (existingEntry) {
        cartItems.setKey(item.name, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        cartItems.setKey(item.name, { ...item, quantity: 1 });
    }
}

export function decrementItemQuantity(name: string) {
    const existingEntry = cartItems.get()[name];

    if (existingEntry) {
        if (existingEntry.quantity === 1) {
            removeItem(name);
            return;
        }

        cartItems.setKey(name, {
            ...existingEntry,
            quantity: existingEntry.quantity - 1,
        });
    }
}

export function removeItem(name: string) {
    cartItems.setKey(name, undefined);
}

export function resetCart() {
    cartItems.set({});
}
