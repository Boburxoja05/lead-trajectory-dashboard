import { pulQiymat } from "@/utils/calculations";

export default function SourceAnalysis({ data }) {
  return (
    <div className="card p-5 overflow-x-auto">
      <h2 className="card-title" style={{ marginBottom: 4 }}>Manbalar tahlili</h2>
      <p className="card-subtitle" style={{ marginBottom: 16 }}>
        Facebook, Instagram va Messenger bo'yicha lid, CPL, ROAS solishtirmasi
      </p>

      <table className="table-dark" style={{ minWidth: 750 }}>
        <thead>
          <tr>
            <th>Manba</th>
            <th>Lid</th>
            <th>CPL</th>
            <th>Sotuv</th>
            <th>CPA</th>
            <th>Sales CR</th>
            <th>Revenue</th>
            <th>ROAS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.manba}>
              <td style={{ color: "#fff", fontWeight: 600 }}>{item.manba}</td>
              <td>{item.lid}</td>
              <td className="accent-text" style={{ fontWeight: 700 }}>{pulQiymat(item.cpl)}</td>
              <td>{item.sotuv}</td>
              <td className="red-text" style={{ fontWeight: 700 }}>{pulQiymat(item.cpa)}</td>
              <td className="purple-text" style={{ fontWeight: 700 }}>{item.cr}%</td>
              <td className="green-text" style={{ fontWeight: 700 }}>{pulQiymat(item.tushum)}</td>
              <td className="blue-text" style={{ fontWeight: 700 }}>{item.roas.toFixed(1)}x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
