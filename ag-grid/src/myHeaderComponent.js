function MyHeaderComponent() { }

MyHeaderComponent.prototype.init = function (params) {
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = params.displayName;
};

MyHeaderComponent.prototype.getGui = function (params) {
  return this.eGui;
};

export default MyHeaderComponent;