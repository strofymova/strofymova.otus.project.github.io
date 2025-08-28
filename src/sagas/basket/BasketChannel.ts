import 'broadcastchannel-polyfill';
import { BasketProduct } from '../../entities/base.types';
import { store } from '../../store';
import { basketActions } from '../../store/basket';

type BasketChannelMessageInit = {
  type: 'init';
};

type BasketChannelMessageSet = {
  type: 'set';
  payload: BasketProduct[];
};

type BasketChannelMessage = BasketChannelMessageSet | BasketChannelMessageInit;

export class BasketChannel {
  channel: BroadcastChannel;

  init: boolean;

  wasUpdated: boolean;

  basket: BasketProduct[];

  constructor(key: string) {
    this.channel = new BroadcastChannel(key);
    this.wasUpdated = false;
    this.init = false;

    this.channel.addEventListener('message', (event: MessageEvent<BasketChannelMessage>) => {
      const { type } = event.data;
      switch (type) {
        case 'init': {
          if (this.basket) {
            this.wasUpdated = true;
            this.channel.postMessage({ type: 'set', payload: this.basket });
          }

          break;
        }

        case 'set': {
          this.wasUpdated = true;
          const basket = (<BasketChannelMessageSet>event.data).payload;
          if (basket) {
            store.dispatch(basketActions.set(basket));
          } else {
            store.dispatch(basketActions.clear());
          }
          break;
        }

        default:
          break;
      }
    });
  }

  setBasket = (basket: BasketProduct[]) => {
    this.basket = basket;

    if (!this.init) {
      this.init = true;
      this.channel.postMessage({ type: 'init' });
      return;
    }

    if (this.wasUpdated) {
      this.wasUpdated = false;
      return;
    }

    this.channel.postMessage({ type: 'set', payload: basket });
  };
}
