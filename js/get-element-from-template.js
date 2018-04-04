function getElementFromTemplate(template) {
  let templateNode = document.createElement(`div`);
  templateNode.innerHTML = template;
  return templateNode;
}

export default getElementFromTemplate;
