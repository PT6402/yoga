import { Fragment, useEffect, useState } from "react";

import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useProductAdmin } from "../../../../hooks/admin";
import { StepDescription, StepImage, StepInfo, StepVariant } from "./steps";

export default function EditProductPage() {
  const { id } = useParams();
  const { getOneProduct } = useProductAdmin();
  const [activeTab, setActiveTab] = useState("info");
  const [load, setLoad] = useState(true);
  const data = [
    {
      label: "Info",
      value: "info",
      element: <StepInfo />,
    },
    {
      label: "Variant",
      value: "variant",
      element: <StepVariant />,
    },
    {
      label: "Image",
      value: "image",
      element: <StepImage />,
    },
    {
      label: "Description",
      value: "description",
      element: <StepDescription />,
    },
  ];
  useEffect(() => {
    if (id) {
      getOneProduct(Number(id)).then((res) => {
        if (res) {
          setLoad(false);
        }
      });
    }
  }, []);
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 px-10 mt-5"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      {!load &&
        data.map(({ value, element }) => (
          <Fragment key={value}>{value == activeTab && element}</Fragment>
        ))}
    </Tabs>
  );
}
