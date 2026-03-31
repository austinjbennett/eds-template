import { n as e, r as t, t as n } from "../_shared/jsx-runtime-CFYM6stx.js";
//#region src/blocks/budget-planner/BudgetPlanner.tsx
var r = e(), i = t(), a = n();
function o(e) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(e);
}
function s(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function c(e, t) {
	let n = e.reduce((e, t) => e + t.budget, 0), r = e.reduce((e, t) => e + t.budget / t.cpl, 0), i = e.reduce((e, t) => e + t.budget / t.cpl * t.conversionRate, 0), a = i * t;
	return {
		totalBudget: n,
		totalLeads: r,
		totalDeals: i,
		projectedRevenue: a,
		projectedRoi: n === 0 ? 0 : (a - n) / n * 100
	};
}
function l({ title: e = "Budget Planner", description: t = "Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.", initialChannels: n, averageDealValue: r }) {
	let [l, u] = (0, i.useState)(n), [d, f] = (0, i.useState)(r), p = (0, i.useMemo)(() => c(l, d), [l, d]), m = (e, t) => {
		u((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	};
	return /* @__PURE__ */ (0, a.jsxs)("section", {
		className: "budget-planner",
		"aria-label": "Marketing budget planner",
		children: [
			/* @__PURE__ */ (0, a.jsxs)("header", {
				className: "budget-planner-header",
				children: [/* @__PURE__ */ (0, a.jsx)("h2", { children: e }), /* @__PURE__ */ (0, a.jsx)("p", { children: t })]
			}),
			/* @__PURE__ */ (0, a.jsxs)("div", {
				className: "budget-planner-deal-value",
				children: [/* @__PURE__ */ (0, a.jsx)("label", {
					htmlFor: "deal-value",
					children: "Average deal value"
				}), /* @__PURE__ */ (0, a.jsx)("input", {
					id: "deal-value",
					type: "number",
					min: 1e3,
					step: 500,
					value: d,
					onChange: (e) => f(s(Number(e.target.value) || 0, 1e3, 1e5))
				})]
			}),
			/* @__PURE__ */ (0, a.jsx)("ul", {
				className: "budget-planner-channels",
				children: l.map((e) => {
					let t = e.budget / e.cpl, n = t * e.conversionRate;
					return /* @__PURE__ */ (0, a.jsxs)("li", {
						className: "budget-planner-channel-card",
						children: [
							/* @__PURE__ */ (0, a.jsx)("h3", { children: e.name }),
							/* @__PURE__ */ (0, a.jsxs)("div", {
								className: "budget-planner-field",
								children: [
									/* @__PURE__ */ (0, a.jsx)("label", {
										htmlFor: `${e.id}-budget`,
										children: "Monthly budget"
									}),
									/* @__PURE__ */ (0, a.jsx)("input", {
										id: `${e.id}-budget`,
										type: "range",
										min: 1e3,
										max: 5e4,
										step: 500,
										value: e.budget,
										onChange: (t) => m(e.id, { budget: Number(t.target.value) })
									}),
									/* @__PURE__ */ (0, a.jsx)("output", { children: o(e.budget) })
								]
							}),
							/* @__PURE__ */ (0, a.jsxs)("div", {
								className: "budget-planner-field-grid",
								children: [/* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("label", {
									htmlFor: `${e.id}-cpl`,
									children: "Cost per lead"
								}), /* @__PURE__ */ (0, a.jsx)("input", {
									id: `${e.id}-cpl`,
									type: "number",
									min: 10,
									step: 5,
									value: e.cpl,
									onChange: (t) => m(e.id, { cpl: s(Number(t.target.value) || 0, 10, 1e3) })
								})] }), /* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("label", {
									htmlFor: `${e.id}-conversion`,
									children: "Lead-to-deal conversion %"
								}), /* @__PURE__ */ (0, a.jsx)("input", {
									id: `${e.id}-conversion`,
									type: "number",
									min: 1,
									max: 100,
									step: 1,
									value: Math.round(e.conversionRate * 100),
									onChange: (t) => m(e.id, { conversionRate: s(Number(t.target.value) || 0, 1, 100) / 100 })
								})] })]
							}),
							/* @__PURE__ */ (0, a.jsxs)("p", {
								className: "budget-planner-metrics",
								children: [
									Math.round(t),
									" leads/month, ",
									n.toFixed(1),
									" deals/month"
								]
							})
						]
					}, e.id);
				})
			}),
			/* @__PURE__ */ (0, a.jsxs)("dl", {
				className: "budget-planner-summary",
				children: [
					/* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Total budget" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: o(p.totalBudget) })] }),
					/* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Projected leads" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: Math.round(p.totalLeads).toLocaleString() })] }),
					/* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Projected revenue" }), /* @__PURE__ */ (0, a.jsx)("dd", { children: o(p.projectedRevenue) })] }),
					/* @__PURE__ */ (0, a.jsxs)("div", { children: [/* @__PURE__ */ (0, a.jsx)("dt", { children: "Projected ROI" }), /* @__PURE__ */ (0, a.jsxs)("dd", {
						className: p.projectedRoi >= 0 ? "is-positive" : "is-negative",
						children: [p.projectedRoi.toFixed(1), "%"]
					})] })
				]
			})
		]
	});
}
//#endregion
//#region src/blocks/budget-planner/index.tsx
var u = /* @__PURE__ */ new WeakMap(), d = [
	{
		id: "paid-search",
		name: "Paid Search",
		budget: 14e3,
		cpl: 120,
		conversionRate: .12
	},
	{
		id: "linkedin-ads",
		name: "LinkedIn Ads",
		budget: 1e4,
		cpl: 165,
		conversionRate: .1
	},
	{
		id: "webinars",
		name: "Webinars",
		budget: 7e3,
		cpl: 95,
		conversionRate: .16
	}
];
function f(e, t = {}) {
	let n = u.get(e) ?? (0, r.createRoot)(e);
	u.has(e) || u.set(e, n), n.render(/* @__PURE__ */ (0, a.jsx)(l, {
		title: t.title ?? "Budget Planner",
		description: t.description ?? "Adjust channel spend and assumptions to forecast leads, pipeline, and ROI in real time.",
		averageDealValue: t.averageDealValue ?? 18e3,
		initialChannels: t.initialChannels ?? d
	}));
}
function p(e) {
	let t = u.get(e);
	t && (t.unmount(), u.delete(e));
}
//#endregion
export { f as mount, p as unmount };

//# sourceMappingURL=budget-planner.js.map