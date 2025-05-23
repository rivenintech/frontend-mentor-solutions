import { cartItems, resetCart } from "@/cartStore";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatCurrency } from "@/utils/formatCurrency";
import { useStore } from "@nanostores/react";
import { useState } from "react";

type DialogDrawerProps = {
    ComponentType: typeof Dialog | typeof Drawer;
    Trigger: typeof DialogTrigger | typeof DrawerTrigger;
    Content: typeof DialogContent | typeof DrawerContent;
    Header: typeof DialogHeader | typeof DrawerHeader;
    Close: typeof DialogClose | typeof DrawerClose;
    Title: typeof DialogTitle | typeof DrawerTitle;
    Description: typeof DialogDescription | typeof DrawerDescription;
};
function DialogDrawer({ ComponentType, Trigger, Content, Header, Close, Title, Description }: DialogDrawerProps) {
    const [open, setOpen] = useState(false);
    const $cartItems = Object.values(useStore(cartItems));

    return (
        <ComponentType open={open} onOpenChange={setOpen}>
            <Trigger className="bg-red w-full rounded-full py-3 font-semibold text-white duration-200 hover:bg-red-900/95">Confirm Order</Trigger>
            <Content className="sm:p-10 md:max-w-2xl">
                <Header className="text-left">
                    <img src="./assets/images/icon-order-confirmed.svg" alt="Confirmation icon" width="48" height="48" />
                    <Title className="mt-3 text-5xl font-bold">Order Confirmed</Title>
                    <Description className="text-lg">We hope you enjoy your food!</Description>
                </Header>
                <div className="my-4 rounded-lg bg-rose-50">
                    <div className="max-h-[35vh] overflow-auto px-6 md:max-h-[50vh]">
                        {$cartItems.map((item) => (
                            <div className="flex items-center border-b border-rose-100 py-6" key={item.name}>
                                <img src={item.image.thumbnail} alt={item.name} className="max-w-[64px] rounded-lg" />
                                <div className="ml-4">
                                    <p className="line-clamp-1 font-semibold">{item.name}</p>
                                    <p className="mt-2 flex gap-4">
                                        <span className="text-red font-semibold">{item.quantity}x</span>
                                        <span className="text-rose-400">@ {formatCurrency(item.price)}</span>
                                    </p>
                                </div>
                                <p className="ml-auto text-lg font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-rose-100 p-6">
                        <p>Order Total</p>
                        <p className="text-2xl font-bold">
                            {formatCurrency($cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))}
                        </p>
                    </div>
                </div>
                <Close
                    onClick={() => resetCart()}
                    className="bg-red w-full rounded-full py-3 font-semibold text-white duration-200 hover:bg-red-900/95"
                >
                    Start New Order
                </Close>
            </Content>
        </ComponentType>
    );
}

export function ConfirmationModal() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <DialogDrawer
                ComponentType={Dialog}
                Trigger={DialogTrigger}
                Content={DialogContent}
                Header={DialogHeader}
                Close={DialogClose}
                Title={DialogTitle}
                Description={DialogDescription}
            />
        );
    }

    return (
        <DialogDrawer
            ComponentType={Drawer}
            Trigger={DrawerTrigger}
            Content={DrawerContent}
            Header={DrawerHeader}
            Close={DrawerClose}
            Title={DrawerTitle}
            Description={DrawerDescription}
        />
    );
}
