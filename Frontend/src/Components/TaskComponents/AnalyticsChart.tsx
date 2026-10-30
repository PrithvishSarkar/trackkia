import { Container } from "react-bootstrap";
import { useThemeContext } from "@/ContextAPI/ThemeContext.tsx";
import styles from "@/Components/cssModules/analytics.module.css";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  type PieSectorShapeProps,
  Sector
} from "recharts";

interface StatusAnalyticsType {
  name: "Pending" | "In Progress" | "Completed";
  value: number;
}

interface PriorityAnalyticsType {
  name: "Low Priority" | "Medium Priority" | "High Priority";
  value: number;
}

interface AnalyticsChartPropType {
  title: string;
  analyticsArray: StatusAnalyticsType[] | PriorityAnalyticsType[];
  totalTasks: number;
  innerRadius: number;
}

const colors = ["#ef4444", "#eab308", "#10b981"];

const MyCustomPie = (props: PieSectorShapeProps) => (
  <Sector {...props} fill={colors[props.index % colors.length]} />
);

const AnalyticsChart = ({
  title,
  analyticsArray,
  totalTasks,
  innerRadius,
}: AnalyticsChartPropType) => {
  const { theme } = useThemeContext();
  const isThemeDark: boolean = theme === "dark";

  return (
    <main
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "1rem",
      }}
    >
      <Container className={`fw-bold fs-5 ${isThemeDark && "text-light"}`}>
        {title}
      </Container>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={analyticsArray}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            label
            fill="#111"
            shape={MyCustomPie}
          >
            <Tooltip />
          </Pie>
          {/* Text inside Donut */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "16px", fontWeight: "bold" }}
            className={`${isThemeDark && styles.taskStatusSvgTextDarkStyle}`}
          >
            {`Total: ${totalTasks}`}
          </text>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </main>
  );
};

export default AnalyticsChart;
