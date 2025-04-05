---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://cdn.discordapp.com/avatars/270360642496626690/f1fbb74aae06664f9f26e015bfbbbe68?size=1024',
    name: 'x1025',
    title: 'Alcuahtl, Chieftain, Councillor',
    links: []
  },
  {
    avatar: "https://cdn.discordapp.com/avatars/226898080547602432/4d5bd0e67eeb25555326eef31170c7b6?size=1024",
    name: "NeoTide",
    title: 'Councillor',
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/168800441126092800/9a7499056a75efea8e3abc433faf291b?size=1024',
    name: "Aki",
    title: 'Councillor',
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/547001895458177044/c7221758012e40f4ff5e3a12b6b1ff1e?size=1024',
    name: "VilyanZ",
    title: 'Councillor',
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/314198862560493569/75c0774c2784fc9ad5fb3d4d0a7eb80a?size=1024',
    name: "Feathercrown",
    title: 'High Justice',
  },
  {
    avatar: 'https://cdn.discordapp.com/avatars/168818172781264897/a3cdc309389db167bd69c05778c790dd?size=1024',
    name: "MechanicalRift",
    title: 'General',
  },
]

const day = new Date();
if (day.getMonth()+1 === 4 && day.getDate() === 1) {
    members.forEach((member) => {
    member.title = member.title.replace("Alcuahtl", "Axolotl");
  })
}
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Government Officials
    </template>
    <template #lead>
        Yoahtl is comprised of people from around the world,
        and those listed below are among those who hold offical jobs within it.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
