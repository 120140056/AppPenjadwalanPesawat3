import { ADD_ROW, UPDATE_ROW, DELETE_ROW } from "./actions";

const initialState = {
  rows: [
    { asal: 'CGK', tujuan: 'DPS', tanggal: '2023-03-20', merk: 'Garuda Indonesia' },
    { asal: 'DPS', tujuan: 'CGK', tanggal: '2023-03-22', merk: 'Citilink' },
    { asal: 'SUB', tujuan: 'CGK', tanggal: '2023-03-23', merk: 'Lion Air' },
    { asal: 'CGK', tujuan: 'UPG', tanggal: '2023-03-24', merk: 'Batik Air' },
    { asal: 'BTH', tujuan: 'CGK', tanggal: '2023-03-25', merk: 'Garuda Indonesia' },
    { asal: 'CGK', tujuan: 'PNK', tanggal: '2023-03-26', merk: 'Sriwijaya Air' },
    { asal: 'PLM', tujuan: 'CGK', tanggal: '2023-03-27', merk: 'Citilink' },
    { asal: 'CGK', tujuan: 'KNO', tanggal: '2023-03-28', merk: 'Lion Air' },
    { asal: 'DPS', tujuan: 'SUB', tanggal: '2023-03-29', merk: 'Garuda Indonesia' },
    { asal: 'CGK', tujuan: 'PKU', tanggal: '2023-03-30', merk: 'Batik Air' },
    { asal: 'KNO', tujuan: 'CGK', tanggal: '2023-04-01', merk: 'Sriwijaya Air' },
    { asal: 'UPG', tujuan: 'CGK', tanggal: '2023-04-03', merk: 'Lion Air' },
    { asal: 'CGK', tujuan: 'BTH', tanggal: '2023-04-04', merk: 'Garuda Indonesia' },
    { asal: 'PNK', tujuan: 'CGK', tanggal: '2023-04-06', merk: 'Citilink' },
    { asal: 'CGK', tujuan: 'PLM', tanggal: '2023-04-08', merk: 'Lion Air' },
    { asal: 'SUB', tujuan: 'DPS', tanggal: '2023-04-09', merk: 'Batik Air' },
    { asal: 'CGK', tujuan: 'DPS', tanggal: '2023-04-11', merk: 'Sriwijaya Air' },
    { asal: 'PKU', tujuan: 'CGK', tanggal: '2023-04-12', merk: 'Garuda Indonesia' },
    { asal: 'CGK', tujuan: 'KNO', tanggal: '2023-04-14', merk: 'Citilink' },
    { asal: 'DPS', tujuan: 'SUB', tanggal: '2023-04-15', merk: 'Lion Air' }
  ],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ROW:
      return {
        ...state,
        rows: [...state.rows, action.row],
      };
    case UPDATE_ROW:
      const updatedRows = state.rows.map((row) => {
        if (
          row.asal === action.row.asal &&
          row.tujuan === action.row.tujuan &&
          row.tanggal === action.row.tanggal &&
          row.merk === action.row.merk
        ) {
          return action.row;
        }
        return row;
      });
      return {
        ...state,
        rows: updatedRows,
      };
    case DELETE_ROW:
      const filteredRows = state.rows.filter((row) => {
        return (
          row.asal !== action.row.asal ||
          row.tujuan !== action.row.tujuan ||
          row.tanggal !== action.row.tanggal ||
          row.merk !== action.row.merk
        );
      });
      return {
        ...state,
        rows: filteredRows,
      };
    default:
      return state;
  }
}

export default rootReducer;