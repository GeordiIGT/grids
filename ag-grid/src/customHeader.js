class CustomHeader {
    init(params) {
        this.params = params;
        this.eGui = document.createElement('div');
        this.eGui.classList.add('ma-custom-header');
        this.eGui.innerHTML = `
        
              <div class="customHeaderMenuButton">
                  <i class="fa ${this.params.menuIcon}"></i>
              </div>
              <div class="customHeaderLabel">${this.params.displayName}</div>
              <div class="customSortDownLabel inactive">
                  <i class="fa fa-long-arrow-alt-down"></i>
              </div>
              <div class="customSortUpLabel inactive">
                  <i class="fa fa-long-arrow-alt-up"></i>
              </div>
              <div class="customSortRemoveLabel inactive">
                  <i class="fa fa-times"></i>
              </div>
          
          `;

        this.eMenuButton = this.eGui.querySelector('.customHeaderMenuButton');

        this.eSortDownButton = this.eGui.querySelector('.customSortDownLabel');
        this.eSortUpButton = this.eGui.querySelector('.customSortUpLabel');
        this.eSortRemoveButton = this.eGui.querySelector('.customSortRemoveLabel');

        // hide and display menu button below
        this.eMenuButton.classList.add('hideMenu');
        let menubutton = this.eMenuButton;
        let header = params.eGridHeader;
        if(header){
            header.addEventListener('mouseenter', function menuVisible() {
                menubutton.classList.remove('hideMenu');
            });
            header.addEventListener('mouseleave', function menuHidden() {
                menubutton.classList.add('hideMenu');
            });
        }

        if (this.params.enableMenu) {
            this.onMenuClickListener = this.onMenuClick.bind(this);
            this.eMenuButton.addEventListener('click', this.onMenuClickListener);
        } else {
            this.eGui.removeChild(this.eMenuButton);
        }

        if (this.params.enableSorting) {
            this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
            this.eSortDownButton.addEventListener(
                'click',
                this.onSortAscRequestedListener
            );
            this.onSortDescRequestedListener = this.onSortRequested.bind(
                this,
                'desc'
            );
            this.eSortUpButton.addEventListener(
                'click',
                this.onSortDescRequestedListener
            );
            this.onRemoveSortListener = this.onSortRequested.bind(this, '');
            this.eSortRemoveButton.addEventListener(
                'click',
                this.onRemoveSortListener
            );

            this.onSortChangedListener = this.onSortChanged.bind(this);
            this.params.column.addEventListener(
                'sortChanged',
                this.onSortChangedListener
            );
            this.onSortChanged();
        } else {
            this.eGui.removeChild(this.eSortDownButton);
            this.eGui.removeChild(this.eSortUpButton);
            this.eGui.removeChild(this.eSortRemoveButton);
        }
    }

    onSortChanged() {
        const deactivate = (toDeactivateItems) => {
            toDeactivateItems.forEach((toDeactivate) => {
                toDeactivate.className = toDeactivate.className.split(' ')[0];
            });
        };

        const activate = (toActivate) => {
            toActivate.className = toActivate.className + ' active';
        };

        if (this.params.column.isSortAscending()) {
            deactivate([this.eSortUpButton, this.eSortRemoveButton]);
            activate(this.eSortDownButton);
        } else if (this.params.column.isSortDescending()) {
            deactivate([this.eSortDownButton, this.eSortRemoveButton]);
            activate(this.eSortUpButton);
        } else {
            deactivate([this.eSortUpButton, this.eSortDownButton]);
            activate(this.eSortRemoveButton);
        }
    }

    getGui() {
        return this.eGui;
    }

    onMenuClick() {
        this.params.showColumnMenu(this.eMenuButton);
    }

    onSortRequested(order, event) {
        this.params.setSort(order, event.shiftKey);
    }

    destroy() {
        if (this.onMenuClickListener) {
            this.eMenuButton.removeEventListener('click', this.onMenuClickListener);
        }
        this.eSortDownButton.removeEventListener(
            'click',
            this.onSortRequestedListener
        );
        this.eSortUpButton.removeEventListener(
            'click',
            this.onSortRequestedListener
        );
        this.eSortRemoveButton.removeEventListener(
            'click',
            this.onSortRequestedListener
        );
        this.params.column.removeEventListener(
            'sortChanged',
            this.onSortChangedListener
        );
    }
}
export default CustomHeader;