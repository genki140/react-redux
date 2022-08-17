import { appSlice } from '../logics/store';

test('reduxTest', () => {
  // 初期化
  let state = appSlice.reducer(undefined, { type: '@@INIT' });
  console.log(state);

  // URLの移動
  state = appSlice.reducer(state, appSlice.actions.moveTo({ pathname: '/' }));
  console.log(state);

  // カウンター
  state = appSlice.reducer(state, appSlice.actions.additional(1));
  console.log(state);

  // URLの移動
  state = appSlice.reducer(
    state,
    appSlice.actions.moveTo({ pathname: '/settings' })
  );
  console.log(state);

  expect(true).toEqual(true);
});

// こうやって書けたら便利そう
// expect(exec(actions.additional1(1)).count).toEqual(1);

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
