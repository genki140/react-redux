import { appSlice } from '../logics/store';

test('reduxTest', () => {
  // 初期化
  let state = appSlice.reducer(undefined, { type: '@@INIT' });
  console.log(state);

  // URLの移動も再現
  // state = appSlice.reducer(state, appSlice.actions.moveTo('/')); // to index

  // こうやって書けたら便利そう
  // expect(exec(actions.additional1(1)).count).toEqual(1);

  // add count1
  state = appSlice.reducer(state, appSlice.actions.additional1(1));
  console.log(state);

  // add count2
  state = appSlice.reducer(state, appSlice.actions.additional2(2));
  console.log(state);

  expect(true).toEqual(true);

  // it('sets customer data when getLiffIdToken is fulfilled', () => {
  //   const action = {
  //     type: getLiffIdToken.fulfilled.type,
  //     payload: {
  //       liffIdToken: 'asdfghjk',
  //     },
  //   };
  //   const state = authSlice.reducer(initialState, action);
  //   expect(state.liffIdToken).toEqual('asdfghjk');
  //   expect(state.error).not.toBeDefined();
  // });

  // it('sets error when getLiffIdToken is rejected', () => {
  //   const action = {
  //     type: getLiffIdToken.rejected.type,
  //     payload: { error: 'some error' },
  //   };
  //   const state = authSlice.reducer(initialState, action);
  //   expect(state.error).not.toBeDefined();
  // });
});
