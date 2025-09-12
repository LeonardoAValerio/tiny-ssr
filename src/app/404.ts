import { Text } from "../components/Text.js";
import { Page } from "../lib/structure-components/page.js";
import { Widget } from "../lib/structure-components/widget.js";

export default new Page({
    title: 'Oi',
    children: [
        new Widget({
            element: "div",
            children: [
                new Text("404", { element: "h1" }),
                new Widget({
                    element: "div",
                    children: [
                        new Widget({
                            style: { fontSize: "12px" },
                            element: "a",
                            name: "Página não encontrada. Volte para a Home!"
                        })
                    ],
                    style: {
                        padding: "12px",
                        border: "1px solid #000"
                    }
                })
            ],
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                minWidth: "100vw"
            }
        })
    ]
})