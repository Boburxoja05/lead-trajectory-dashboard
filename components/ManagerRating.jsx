import { pulQiymat } from "@/utils/calculations";

export default function ManagerRating({ data }) {
  return (
    <div className="card p-5 overflow-x-auto">
      <h2 className="card-title" style={{ marginBottom: 4 }}>Menejerlar reytingi</h2>
      <p className="card-subtitle" style={{ marginBottom: 16 }}>
        Har bir menejer bo'yicha lid, sotuv va konversiya ko'rsatkichlari
      </p>

      <table className="table-dark" style={{ minWidth: 860 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Menejer</th>
            <th>Lid</th>
            <th>Sotuv</th>
            <th>Sales CR</th>
            <th>Revenue</th>
            <th>O'rtacha chek</th>
            <th>Holat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const xavf = item.sotuv === 0 || Number(String(item.cr).replace(",", ".")) < 5;
            return (
              <tr key={item.menejer}>
                <td className="muted-text">{index + 1}</td>
                <td style={{ color: "#fff", fontWeight: 600 }}>{item.menejer}</td>
                <td>{item.lid}</td>
                <td>{item.sotuv}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{item.cr}%</td>
                <td className="green-text" style={{ fontWeight: 700 }}>{pulQiymat(item.tushum)}</td>
                <td>{pulQiymat(item.sotuv ? item.tushum / item.sotuv : 0)}</td>
                <td>
                  <span className={`badge ${xavf ? "badge-red" : "badge-green"}`}>
                    {xavf ? "E'tibor kerak" : "Barqaror"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
