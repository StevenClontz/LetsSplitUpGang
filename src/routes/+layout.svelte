<script>
    import "carbon-components-svelte/css/all.css";
    import {
      Header,
      HeaderNav,
      HeaderNavItem,
    //   HeaderNavMenu,
      SkipToContent,
      Content,
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";
  
    let isSideNavOpen = false;
  </script>
  
  <Header platformName="LSUG.Clontz.org" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
      <HeaderNavItem href="/" text="Home" />
      <!-- <HeaderNavMenu text="Menu">
        <HeaderNavItem href="/" text="Home" />
      </HeaderNavMenu> -->
    </HeaderNav>
  </Header>
  
  <Content>
    <Grid>
      <Row>
        <Column>
          <h1>Let's Split Up Gang!</h1>
          <slot/>
        </Column>
      </Row>
    </Grid>
  </Content>
  