import { BasketProduct } from "src/entities/base.types";
import { Product } from "src/entities/products.types";
import { RootState } from "src/store";
import { basket, basketActions, basketSelectors } from "src/store/basket";

const mockProduct1: Product = {
  id: '1',
  name: 'Product 1',
  price: 100,
  photo: 'photo1.jpg',
  desc: 'Description 1',
  category: {
    id: 'cat-test-1',
    name: 'Test category 1',
    commandId:'test',
    createdAt:'19/08/21T18:00',
    updatedAt: '19/08/21T18:02',
  },
  commandId: 'test',
  createdAt: '19/08/21T18:00',
  updatedAt: '19/08/21T18:02'
};

const mockProduct2: Product = {
  id: '2',
  name: 'Product 2',
  price: 200,
  photo: 'photo2.jpg',
  desc: 'Description 2',
  category: {
    id: 'cat-test-2',
    name: 'Test category 2',
    commandId:'test',
    createdAt:'2019/08/01T18:00',
    updatedAt: '2019/08/01T18:02',
  },
  commandId: 'test',
  createdAt: '2019/08/01T18:00',
  updatedAt: '2019/08/01T18:02'
};

const mockBasketProduct1: BasketProduct = {
  product: mockProduct1,
  count: 2,
};

const mockBasketProduct2: BasketProduct = {
  product: mockProduct2,
  count: 1,
};

describe('basket slice', () => {
  describe('actions', () => {
    it('should set basket', () => {
      const initialState: BasketProduct[] = [];
      const action = basketActions.set([mockBasketProduct1, mockBasketProduct2]);
      const newState = basket(initialState, action);

      expect(newState).toEqual([mockBasketProduct1, mockBasketProduct2]);
      expect(newState).toHaveLength(2);
    });

    it('should add new product to basket', () => {
      const initialState: BasketProduct[] = [mockBasketProduct1];
      const newProduct: BasketProduct = {
        product: mockProduct2,
        count: 3,
      };
      const action = basketActions.add(newProduct);
      const newState = basket(initialState, action);

      expect(newState).toHaveLength(2);
      expect(newState[1]).toEqual(newProduct);
    });

    it('should update count of existing product', () => {
      const initialState: BasketProduct[] = [mockBasketProduct1];
      const updatedProduct: BasketProduct = {
        product: mockProduct1,
        count: 5,
      };
      const action = basketActions.add(updatedProduct);
      const newState = basket(initialState, action);

      expect(newState).toHaveLength(1);
      expect(newState[0].count).toBe(5);
    });

    it('should remove product', () => {
      const initialState: BasketProduct[] = [mockBasketProduct1, mockBasketProduct2];
      const action = basketActions.remove('1');
      const newState = basket(initialState, action);

      expect(newState).toHaveLength(1);
      expect(newState[0].product.id).toBe('2');
    });

    it('should clear basket with clear action', () => {
      const initialState: BasketProduct[] = [mockBasketProduct1, mockBasketProduct2];
      const action = basketActions.clear();
      const newState = basket(initialState, action);

      expect(newState).toEqual([]);
    });
  });

  describe('selectors', () => {
    const mockState: RootState = {
      basket: [mockBasketProduct1, mockBasketProduct2],
    } as RootState;

    it('should get basket', () => {
      const result = basketSelectors.get(mockState);
      expect(result).toEqual([mockBasketProduct1, mockBasketProduct2]);
    });

    it('should calculate total items', () => {
      const result = basketSelectors.getTotalItems(mockState);
      expect(result).toBe(3);
    });

    it('should calculate total price', () => {
      const result = basketSelectors.getTotalPrice(mockState);
      expect(result).toBe(400);
    });
  });

  describe('complex actions', () => {
    it('should handle multiple operations', () => {
      let state: BasketProduct[] = [];

      state = basket(state, basketActions.add(mockBasketProduct1));
      expect(state).toHaveLength(1);

      state = basket(state, basketActions.add(mockBasketProduct2));
      expect(state).toHaveLength(2);

      const updatedProduct1: BasketProduct = {
        product: mockProduct1,
        count: 10,
      };
      state = basket(state, basketActions.add(updatedProduct1));
      expect(state[0].count).toBe(10);

      state = basket(state, basketActions.remove('2'));
      expect(state).toHaveLength(1);

      state = basket(state, basketActions.clear());
      expect(state).toEqual([]);
    });
  });
});