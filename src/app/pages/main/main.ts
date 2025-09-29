import { ChangeDetectorRef, Component, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { expand } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

interface TreeNode {
  name: string;
  type?: any;
  route?: string;
  icon?: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-main',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ScrollingModule,
    RouterOutlet,
    MatTreeModule,
    MatListModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: (event: MediaQueryListEvent) => void;

  // Signals para sidebar
  isShowSidebar = signal(true);

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    this.sidenav?.close();
  }

  toggleSidebar(): void {
    this.isShowSidebar.update((v) => !v);
  }

  public isExpanded = true;

  public mainTreeData: TreeNode[] = [
    { name: 'Dashboard', route: 'dashboard', icon:'dashboard' },
    {
      name: 'Usuários',
      icon: 'person',
      children: [
        { name: 'Adminstrador', route: 'routes.HOSPEDES' },
        { name: 'Usuários', route: 'users' },
        
      ],
    },
    { name: 'Calendário', route: 'calendar', icon:'calendar_month' },
        { name: 'Contatos', route: 'contacts', icon:'call' },
        { name: 'Sobre nós', route: 'about-us', icon:'info' },

  ];

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 1024px)');

    this.mobileQueryListener = (event: MediaQueryListEvent) => {
      this.changeDetectorRef.detectChanges();
    };

    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

    this.isShowSidebar.set(!this.mobileQuery.matches);
  }

  ngOnInit(): void {
    this.expandBasedOnCurrentRoute(this.router.url);

    // Reagir a mudanças de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.expandBasedOnCurrentRoute(event.urlAfterRedirects);
      }
    });
  }

  toggleExpand(node: TreeNode): void {
    if (node.expanded) {
      node.expanded = false;
    } else {
      this.mainTreeData.forEach((n) => (n.expanded = false));
      node.expanded = true;
    }
  }

  private expandBasedOnCurrentRoute(currentUrl: string): void {
    this.mainTreeData.forEach((item) => {
      if (item.children) {
        item.expanded = item.children.some((child) => currentUrl.includes(child.route || ''));
      }
    });
  }

}
  // ----------------------------------

  // toggleSidenav() {
  //   this.sidenav.toggle();
  // }

  //   navigate(path: string) {
  //     this.router.navigate([path]);
  //   }

  //   items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);

  

  //   pages = [
  //     { label: 'Dashboard', route: '/dashboard', icon: 'home' },
  //     { label: 'Usuários', icon: 'group',
  //       expanded: false,
  //       children: [
  //         { label: 'Usuários', route: '/users', icon: 'group' },
  //       ]
  //     },
  //     { label: 'Comércio', route: '', icon: 'paid' }
  //   ];

  //   pagesTwo = [
  //     { label: 'Chat', route: '', icon: 'chat' },
  //     { label: 'Calendário', route: '', icon: 'calendar_month' },
  //     { label: 'Usuários', route: '', icon: 'group' },
  //     { label: 'Email', route: '', icon: 'mail' },
  //     { label: 'Contatos', route: '', icon: 'call' },
  //     { label: 'Anotações', route: '', icon: 'notes' },
  //     { label: 'Sobre nós', route: '/about-us', icon: 'info' },
  //   ];

  //   toggleExpand(page: any) {
  //   page.expanded = !page.expanded;
  // }

