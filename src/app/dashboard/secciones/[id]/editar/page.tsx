import { config } from "@/config";

import { EditarSeccionClient } from "./EditarSeccionClient";

export const metadata = {
	title: `Secciones | Editar | ${config.site.name}`,
};

export default function Page() {
	return <EditarSeccionClient />;
}
