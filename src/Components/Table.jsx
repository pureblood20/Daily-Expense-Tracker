const Table = ({ title, amount, cate, sno, date }) => {
  return (
    <tbody>
      {/* row 1 */}
      <tr>
        <td>{sno}</td>
        <td>{new Date(date).toDateString()}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>{cate}</td>
      </tr>
    </tbody>
  );
};

export default Table;
