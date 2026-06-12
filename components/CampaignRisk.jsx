import { pulQiymat, lidNarxi, mijozNarxi, rentabellik } from "@/utils/calculations";

export default function CampaignRisk({ data }) {
  return (
    <div className="card p-5 overflow-x-auto">
      <h2 className="card-title" style={{ marginBottom: 4 }}>Kampaniyalar bo'yicha tahlil</h2>
      <p className="card-subtitle" style={{ marginBottom: 16 }}>
        Har bir kampaniyaning xarajat, lid va ROAS ko'rsatkichlari
      </p>

      <table className="table-dark" style={{ minWidth: 860 }}>
        <thead>
          <tr>
            <th>Kampaniya</th>
            <th>Xarajat</th>
            <th>Lid</th>
            <th>CPL</th>
            <th>Sotuv</th>
            <th>CPA</th>
            <th>Revenue</th>
            <th>ROAS</th>
            <th>Holat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const roas = rentabellik(item.tushum, item.xarajat);
            const xavf = item.tushum === 0 || roas < 1;
            return (
              <tr key={item.kampaniya}>
                <td style={{ color: "#fff", fontWeight: 600 }}>{item.kampaniya}</td>
                <td>{pulQiymat(item.xarajat)}</td>
                <td>{item.lid}</td>
                <td className="accent-text" style={{ fontWeight: 700 }}>
                  {pulQiymat(lidNarxi(item.xarajat, item.lid))}
                </td>
                <td>{item.sotuv}</td>
                <td className="red-text" style={{ fontWeight: 700 }}>
                  {pulQiymat(mijozNarxi(item.xarajat, item.sotuv))}
                </td>
                <td className="green-text" style={{ fontWeight: 700 }}>{pulQiymat(item.tushum)}</td>
                <td className="blue-text" style={{ fontWeight: 700 }}>{roas.toFixed(1)}x</td>
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
