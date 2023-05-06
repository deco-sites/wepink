import { useEffect } from "preact/hooks";

const setup = ({ rootId }: { rootId: string }) => {
  const root = document.getElementById(rootId);
  const tabButtons = root?.querySelectorAll(`[data-tab-button]`);
  const tabContents = root?.querySelectorAll(`[data-tab-content]`);

  console.log({ root, tabButtons, tabContents, rootId });

  if (
    !root || !tabButtons || !tabContents || tabButtons.length === 0 ||
    tabContents.length === 0
  ) {
    console.warn(
      "Missing necessary tab attributes. It will not work as intended. Necessary elements:",
      { root, tabButtons, tabContents, rootId },
    );
    return;
  }

  const tabButtonsArray = Array.from(tabButtons);
  const tabContentsArray = Array.from(tabContents);

  const handleTabClick = (index: number) => {
    const activeTabButton = tabButtonsArray.find((tabButton) =>
      tabButton.attributes.getNamedItem("data-active")
    );

    const activeTabContent = tabContentsArray.find((tabContent) =>
      tabContent.attributes.getNamedItem("data-active")
    );

    if (activeTabButton) {
      activeTabButton.attributes.removeNamedItem("data-active");
    }

    if (activeTabContent) {
      activeTabContent.attributes.removeNamedItem("data-active");
    }

    tabContentsArray[index].attributes.setNamedItem(
      document.createAttribute("data-active"),
    );
    tabButtonsArray[index].attributes.setNamedItem(
      document.createAttribute("data-active"),
    );
  };

  tabButtonsArray.forEach((tabButton, index) => {
    tabButton.addEventListener("click", () => handleTabClick(index));
  });
};

function TabsControlSetup({ rootId }: { rootId: string }) {
  useEffect(() => setup({ rootId }), [
    rootId,
  ]);

  return <div data-slider-controller-js />;
}

export default TabsControlSetup;
